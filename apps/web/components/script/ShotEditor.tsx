'use client'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { TextArea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Shot } from '@/types'

interface ShotEditorProps {
  shot: Shot
  open: boolean
  onClose: () => void
  onSave: (shot: Shot) => void
}

export function ShotEditor({ shot, open, onClose, onSave }: ShotEditorProps) {
  const [form, setForm] = useState(shot)

  const update = (field: keyof Shot, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <Modal open={open} onClose={onClose} title={`编辑 Shot ${shot.shotNumber}`}>
      <div className="space-y-4">
        <TextArea
          label="台词/旁白"
          value={form.narration}
          onChange={(e) => update('narration', e.target.value)}
          rows={3}
        />
        <TextArea
          label="画面描述"
          value={form.visualDescription}
          onChange={(e) => update('visualDescription', e.target.value)}
          rows={3}
        />
        <TextArea
          label="字幕文案"
          value={form.subtitle}
          onChange={(e) => update('subtitle', e.target.value)}
          rows={2}
        />
        <TextArea
          label="BGM 建议"
          value={form.bgmSuggestion}
          onChange={(e) => update('bgmSuggestion', e.target.value)}
          rows={1}
        />
        <TextArea
          label="拍摄提示"
          value={form.notes || ''}
          onChange={(e) => update('notes', e.target.value)}
          rows={2}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>取消</Button>
          <Button onClick={() => { onSave(form); onClose() }}>保存修改</Button>
        </div>
      </div>
    </Modal>
  )
}
