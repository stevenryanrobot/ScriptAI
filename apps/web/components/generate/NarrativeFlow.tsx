'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { NARRATIVE_CHAINS } from '@/types'
import { NarrativeNode } from './NarrativeNode'
import { Card } from '@/components/ui/Card'
import { Check, Clock } from 'lucide-react'
import type { NarrativeType } from '@/types'

interface NarrativeFlowProps {
  selectedType: NarrativeType | null
  onSelect: (type: NarrativeType) => void
}

export function NarrativeFlow({ selectedType, onSelect }: NarrativeFlowProps) {
  const selectedChain = NARRATIVE_CHAINS.find((c) => c.id === selectedType)

  return (
    <div className="space-y-6">
      {/* Chain cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {NARRATIVE_CHAINS.map((chain) => {
          const selected = selectedType === chain.id
          return (
            <Card
              key={chain.id}
              hover
              selected={selected}
              onClick={() => onSelect(chain.id)}
              padding="md"
            >
              <div className="relative">
                {selected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 mb-1">{chain.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{chain.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>{chain.suitableDuration}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Node flow visualization */}
      <AnimatePresence mode="wait">
        {selectedChain && (
          <motion.div
            key={selectedChain.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-50 rounded-xl p-6"
          >
            <h4 className="text-sm font-medium text-gray-700 mb-4">叙事节点流程</h4>
            <div className="flex items-start gap-0 overflow-x-auto pb-2">
              {selectedChain.nodes.map((node, i) => (
                <div key={node.id} className="flex items-start">
                  <NarrativeNode node={node} index={i} />
                  {i < selectedChain.nodes.length - 1 && (
                    <div className="flex items-center h-16 px-1">
                      <div className="w-8 h-0.5 bg-primary-300" />
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-primary-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
