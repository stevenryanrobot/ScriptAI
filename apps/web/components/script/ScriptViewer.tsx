'use client'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'
import { ShotCard } from './ShotCard'
import { ActionBar } from './ActionBar'
import type { Shot } from '@/types'

interface ScriptViewerProps {
  title: string
  shots: Shot[]
  totalDuration: number
  onEditShot: (shotNumber: number, field: string, value: string) => void
  onRegenerateShot: (shotNumber: number) => void
  onRegenerateAll: () => void
  onSave: () => void
  onExport: () => void
}

export function ScriptViewer({
  title, shots, totalDuration,
  onEditShot, onRegenerateShot,
  onRegenerateAll, onSave, onExport,
}: ScriptViewerProps) {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-gray-900"
        >
          {title}
        </motion.h2>
        <p className="text-sm text-gray-500 mt-1">
          共 {shots.length} 个镜头 · 预估 {totalDuration} 秒
        </p>
      </div>

      {/* Shot cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-4"
      >
        {shots.map((shot) => (
          <ShotCard
            key={shot.shotNumber}
            shot={shot}
            onEdit={onEditShot}
            onRegenerate={onRegenerateShot}
          />
        ))}
      </motion.div>

      {/* Action bar */}
      <ActionBar
        onRegenerateAll={onRegenerateAll}
        onSave={onSave}
        onExport={onExport}
      />
    </div>
  )
}
