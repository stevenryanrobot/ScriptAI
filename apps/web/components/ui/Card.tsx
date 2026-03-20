'use client'
import { HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cardEnter } from '@/lib/animations'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  selected?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddings = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({ hover = false, selected = false, padding = 'md', className = '', children, ...props }: CardProps) {
  return (
    <motion.div
      {...cardEnter}
      whileHover={hover ? { y: -4, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' } : undefined}
      className={`rounded-xl bg-white border transition-all ${
        selected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
      } ${paddings[padding]} ${hover ? 'cursor-pointer' : ''} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.div>
  )
}
