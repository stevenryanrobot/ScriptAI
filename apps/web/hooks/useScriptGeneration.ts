'use client'
import { useState, useCallback } from 'react'
import type { Shot, GenerateParams } from '@/types'

interface ParsedScript {
  title: string
  totalDuration: number
  shots: Shot[]
}

export function useScriptGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [streamedText, setStreamedText] = useState('')
  const [parsedScript, setParsedScript] = useState<ParsedScript | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async (params: GenerateParams) => {
    setIsGenerating(true)
    setStreamedText('')
    setParsedScript(null)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error(`生成失败: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter((line) => line.startsWith('data: '))

        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') {
            try {
              setParsedScript(JSON.parse(fullText))
            } catch (e) {
              console.error('JSON parse failed', e)
              setError('脚本解析失败，请重试')
            }
            setIsGenerating(false)
            return
          }
          const parsed = JSON.parse(data)
          fullText += parsed.text
          setStreamedText(fullText)
        }
      }
    } catch (e: any) {
      setError(e.message || '生成失败')
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return { generate, isGenerating, streamedText, parsedScript, error }
}
