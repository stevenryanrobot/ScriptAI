'use client'
import { STORY_TEMPLATES } from '@/types'
import { TemplateCard } from './TemplateCard'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

interface TemplateGridProps {
  selectedId: string | null
  onSelect: (id: string) => void
  limitFree?: boolean
}

export function TemplateGrid({ selectedId, onSelect, limitFree = false }: TemplateGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {STORY_TEMPLATES.map((template, i) => (
        <TemplateCard
          key={template.id}
          template={template}
          selected={selectedId === template.id}
          locked={limitFree && i >= 4}
          onClick={() => !(limitFree && i >= 4) && onSelect(template.id)}
        />
      ))}
    </motion.div>
  )
}
