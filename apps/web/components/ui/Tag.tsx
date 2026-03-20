'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface TagProps {
  label: string
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
  color?: string
}

export function Tag({ label, selected = false, disabled = false, onClick, size = 'md', color }: TagProps) {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={disabled ? undefined : onClick}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all ${sizeClasses} ${
        selected
          ? 'bg-primary-100 text-primary-700 border-2 border-primary-400'
          : disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-transparent'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent cursor-pointer'
      }`}
    >
      {selected && <Check size={size === 'sm' ? 12 : 14} />}
      {label}
    </motion.button>
  )
}
