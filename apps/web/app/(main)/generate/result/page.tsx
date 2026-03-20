'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGenerateStore } from '@/stores/generateStore'
import { useScriptGeneration } from '@/hooks/useScriptGeneration'
import { StreamingRenderer } from '@/components/script/StreamingRenderer'
import { ScriptViewer } from '@/components/script/ScriptViewer'
import { GenerateButton } from '@/components/generate/GenerateButton'
import { generateComplete } from '@/lib/animations'
import { apiFetch } from '@/lib/api'
import type { Shot } from '@/types'

export default function ResultPage() {
  const router = useRouter()
  const { templateId, narrativeType, elements, customPrompt, reset } = useGenerateStore()
  const { generate, isGenerating, streamedText, parsedScript, error } = useScriptGeneration()
  const [started, setStarted] = useState(false)
  const [editedShots, setEditedShots] = useState<Shot[]>([])

  useEffect(() => {
    if (parsedScript?.shots) {
      setEditedShots(parsedScript.shots)
    }
  }, [parsedScript])

  const handleGenerate = () => {
    if (!templateId || !narrativeType) return
    setStarted(true)
    generate({ templateId, narrativeType, elements, customPrompt })
  }

  const handleEditShot = (shotNumber: number, field: string, value: string) => {
    setEditedShots((prev) =>
      prev.map((s) => (s.shotNumber === shotNumber ? { ...s, [field]: value } : s))
    )
  }

  const handleSave = async () => {
    if (!parsedScript) return
    try {
      await apiFetch('/api/scripts', {
        method: 'POST',
        body: JSON.stringify({
          title: parsedScript.title,
          templateId,
          narrativeType,
          elements,
          shots: editedShots,
          totalDuration: parsedScript.totalDuration,
        }),
      })
      reset()
      router.push('/scripts')
    } catch (e) {
      console.error('Save failed', e)
    }
  }

  const handleExport = () => {
    if (!parsedScript) return
    const text = editedShots.map((s) =>
      `【Shot ${s.shotNumber}】(${s.duration}s)\n台词：${s.narration}\n画面：${s.visualDescription}\n字幕：${s.subtitle}\nBGM：${s.bgmSuggestion}${s.notes ? `\n提示：${s.notes}` : ''}`
    ).join('\n\n---\n\n')
    const fullText = `${parsedScript.title}\n预估时长：${parsedScript.totalDuration}s\n\n${text}`
    navigator.clipboard.writeText(fullText).then(() => alert('已复制到剪贴板'))
  }

  if (!templateId || !narrativeType) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-gray-500 mb-4">请先选择故事模板和叙事链条</p>
        <button onClick={() => router.push('/generate/template')} className="text-primary-600 font-medium">
          返回选择
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {!started && (
        <div className="text-center py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-2">准备就绪</h2>
          <p className="text-gray-500 mb-8">点击下方按钮开始 AI 创作</p>
          <GenerateButton onClick={handleGenerate} />
        </div>
      )}

      {started && !parsedScript && (
        <div>
          <StreamingRenderer text={streamedText} isGenerating={isGenerating} />
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
              <button onClick={handleGenerate} className="ml-2 underline">重试</button>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {parsedScript && (
          <motion.div {...generateComplete}>
            <ScriptViewer
              title={parsedScript.title}
              shots={editedShots}
              totalDuration={parsedScript.totalDuration}
              onEditShot={handleEditShot}
              onRegenerateShot={(n) => console.log('regenerate shot', n)}
              onRegenerateAll={handleGenerate}
              onSave={handleSave}
              onExport={handleExport}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
