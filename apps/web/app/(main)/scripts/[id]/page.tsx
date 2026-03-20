'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import { ScriptViewer } from '@/components/script/ScriptViewer'
import { ShotCardSkeleton } from '@/components/ui/Skeleton'
import type { Script, Shot } from '@/types'

export default function ScriptDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [script, setScript] = useState<Script | null>(null)
  const [editedShots, setEditedShots] = useState<Shot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params?.id) return
    apiFetch<Script>(`/api/scripts/${params.id}`)
      .then((data) => {
        setScript(data)
        setEditedShots(data.shots)
      })
      .catch(() => router.push('/scripts'))
      .finally(() => setLoading(false))
  }, [params?.id, router])

  const handleEditShot = (shotNumber: number, field: string, value: string) => {
    setEditedShots((prev) =>
      prev.map((s) => (s.shotNumber === shotNumber ? { ...s, [field]: value } : s))
    )
  }

  const handleSave = async () => {
    if (!script) return
    await apiFetch(`/api/scripts/${script.id}`, {
      method: 'PUT',
      body: JSON.stringify({ shots: editedShots }),
    })
    alert('保存成功')
  }

  const handleExport = () => {
    if (!script) return
    const text = editedShots.map((s) =>
      `【Shot ${s.shotNumber}】(${s.duration}s)\n台词：${s.narration}\n画面：${s.visualDescription}\n字幕：${s.subtitle}\nBGM：${s.bgmSuggestion}${s.notes ? `\n提示：${s.notes}` : ''}`
    ).join('\n\n---\n\n')
    const fullText = `${script.title}\n预估时长：${script.totalDuration}s\n\n${text}`
    navigator.clipboard.writeText(fullText).then(() => alert('已复制到剪贴板'))
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => <ShotCardSkeleton key={i} />)}
      </div>
    )
  }

  if (!script) return null

  return (
    <div className="max-w-3xl mx-auto">
      <ScriptViewer
        title={script.title}
        shots={editedShots}
        totalDuration={script.totalDuration || 0}
        onEditShot={handleEditShot}
        onRegenerateShot={(n) => console.log('regenerate shot', n)}
        onRegenerateAll={() => router.push('/generate/template')}
        onSave={handleSave}
        onExport={handleExport}
      />
    </div>
  )
}
