'use client'
import { motion } from 'framer-motion'
import { stepTransition } from '@/lib/animations'

interface StepCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function StepCard({ title, subtitle, children }: StepCardProps) {
  return (
    <motion.div
      initial={stepTransition.initial}
      animate={stepTransition.animate}
      exit={stepTransition.exit}
      transition={stepTransition.transition}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  )
}
