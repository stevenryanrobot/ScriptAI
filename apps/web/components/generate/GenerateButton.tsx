'use client'
import { motion } from 'framer-motion'
import { Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface GenerateButtonProps {
  onClick: () => void
  loading?: boolean
  disabled?: boolean
}

export function GenerateButton({ onClick, loading, disabled }: GenerateButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      >
        <Button
          size="lg"
          onClick={onClick}
          loading={loading}
          disabled={disabled}
          icon={!loading ? <Wand2 size={20} /> : undefined}
          className="px-10 py-4 text-base rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-200"
        >
          {loading ? 'AI 正在创作...' : '生成拍摄脚本'}
        </Button>
      </motion.div>
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500"
        >
          正在根据你的人设和选择生成脚本，请稍候...
        </motion.p>
      )}
    </div>
  )
}
