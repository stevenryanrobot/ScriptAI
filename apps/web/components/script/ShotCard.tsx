'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Edit3, RefreshCw, Mic, Video, Type, Music, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Shot } from '@/types'

interface ShotCardProps {
  shot: Shot
  onEdit: (shotNumber: number, field: string, value: string) => void
  onRegenerate: (shotNumber: number) => void
}

export function ShotCard({ shot, onEdit, onRegenerate }: ShotCardProps) {
  const [editing, setEditing] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const startEdit = (field: string, value: string) => {
    setEditing(field)
    setEditValue(value)
  }

  const saveEdit = () => {
    if (editing) {
      onEdit(shot.shotNumber, editing, editValue)
      setEditing(null)
    }
  }

  const renderField = (icon: React.ReactNode, label: string, field: string, value: string, className?: string) => (
    <div className="group">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-gray-400">{icon}</span>
        <div className="flex-1">
          <span className="text-xs text-gray-400">{label}</span>
          {editing === field ? (
            <div className="mt-1">
              <textarea
                className="w-full rounded-lg border border-primary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={2}
                autoFocus
              />
              <div className="flex gap-2 mt-1">
                <button onClick={saveEdit} className="text-xs text-primary-600 font-medium">保存</button>
                <button onClick={() => setEditing(null)} className="text-xs text-gray-400">取消</button>
              </div>
            </div>
          ) : (
            <p
              className={`text-sm mt-0.5 cursor-pointer hover:text-primary-600 transition-colors ${className || 'text-gray-700'}`}
              onClick={() => startEdit(field, value)}
            >
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-xl border border-gray-200 bg-white p-5 space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full">
            Shot {shot.shotNumber}
          </span>
          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
            {shot.duration}s
          </span>
        </div>
        <button
          onClick={() => onRegenerate(shot.shotNumber)}
          className="text-gray-400 hover:text-primary-600 transition-colors p-1"
          title="重新生成此镜头"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {renderField(<Mic size={14} />, '台词/旁白', 'narration', shot.narration, 'text-gray-900 font-medium')}
        {renderField(<Video size={14} />, '画面描述', 'visualDescription', shot.visualDescription, 'text-gray-500')}
        {renderField(<Type size={14} />, '字幕文案', 'subtitle', shot.subtitle, 'text-gray-600 italic')}
        {renderField(<Music size={14} />, 'BGM 建议', 'bgmSuggestion', shot.bgmSuggestion, 'text-gray-500 text-xs')}
        {shot.notes && (
          <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3">
            <Lightbulb size={14} className="text-amber-500 mt-0.5" />
            <p className="text-xs text-amber-700">{shot.notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
