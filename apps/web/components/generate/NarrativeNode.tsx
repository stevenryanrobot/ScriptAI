'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { ChevronDown, Clock } from 'lucide-react'
import type { NarrativeNode as NarrativeNodeType } from '@/types'

interface NarrativeNodeProps {
  node: NarrativeNodeType
  index: number
}

export function NarrativeNode({ node, index }: NarrativeNodeProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-36"
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="rounded-xl bg-white border-2 border-primary-200 p-3 cursor-pointer hover:border-primary-400 transition-colors"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-primary-600">#{index + 1}</span>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
        <h5 className="text-sm font-semibold text-gray-900 mb-1">{node.label}</h5>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={10} />
          <span>{node.durationHint}</span>
        </div>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100"
          >
            {node.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
