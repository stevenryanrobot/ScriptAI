'use client'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Check, Lock, TrendingUp, Coffee, Lightbulb, Heart, Star, GitCompare, Trophy, Eye } from 'lucide-react'
import type { StoryTemplate } from '@/types'

const iconMap: Record<string, any> = {
  TrendingUp, Coffee, Lightbulb, Heart, Star, GitCompare, Trophy, Eye,
}

interface TemplateCardProps {
  template: StoryTemplate
  selected: boolean
  locked?: boolean
  onClick: () => void
}

export function TemplateCard({ template, selected, locked, onClick }: TemplateCardProps) {
  const Icon = iconMap[template.icon] || Lightbulb

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={!locked ? { y: -4, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' } : undefined}
      onClick={onClick}
      className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
        selected
          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
          : locked
          ? 'border-gray-200 opacity-60 cursor-not-allowed'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
          <Check size={14} className="text-white" />
        </div>
      )}
      {locked && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
          <Lock size={12} className="text-white" />
        </div>
      )}
      <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center mb-3`}>
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{template.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {template.suitableFor.map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
