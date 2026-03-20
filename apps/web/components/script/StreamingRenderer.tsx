'use client'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface StreamingRendererProps {
  text: string
  isGenerating: boolean
}

export function StreamingRenderer({ text, isGenerating }: StreamingRendererProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex items-center gap-2 mb-4">
        {isGenerating && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 size={18} className="text-primary-600" />
          </motion.div>
        )}
        <span className="text-sm font-medium text-gray-700">
          {isGenerating ? 'AI 正在创作中...' : '生成完成'}
        </span>
      </div>
      <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono leading-relaxed">
        {text}
        {isGenerating && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-primary-600 ml-0.5"
          />
        )}
      </pre>
    </div>
  )
}
