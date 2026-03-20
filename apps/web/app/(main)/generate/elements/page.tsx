'use client'
import { useRouter } from 'next/navigation'
import { useGenerateStore } from '@/stores/generateStore'
import { ElementPicker } from '@/components/generate/ElementPicker'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, Wand2 } from 'lucide-react'
import { TextArea } from '@/components/ui/Input'

export default function ElementsPage() {
  const router = useRouter()
  const { elements, toggleElement, customPrompt, setCustomPrompt, templateId, narrativeType } = useGenerateStore()

  const canGenerate = templateId && narrativeType

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">选择情节元素</h1>
        <p className="text-sm text-gray-500 mt-1">可选步骤 — 选择你希望脚本包含的元素</p>
      </div>

      <ElementPicker selected={elements} onToggle={toggleElement} />

      <div className="mt-6">
        <TextArea
          label="额外指令（可选）"
          placeholder="例如：视频时长控制在 30 秒以内，重点突出产品的性价比..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={() => router.push('/generate/narrative')} icon={<ChevronLeft size={16} />}>
          上一步
        </Button>
        <Button
          disabled={!canGenerate}
          onClick={() => router.push('/generate/result')}
          icon={<Wand2 size={16} />}
          className="bg-gradient-to-r from-primary-600 to-primary-700"
        >
          生成脚本
        </Button>
      </div>
    </div>
  )
}
