'use client'
import { useRouter } from 'next/navigation'
import { useGenerateStore } from '@/stores/generateStore'
import { TemplateGrid } from '@/components/generate/TemplateGrid'
import { Button } from '@/components/ui/Button'
import { ChevronRight } from 'lucide-react'

export default function TemplatePage() {
  const router = useRouter()
  const { templateId, setTemplate } = useGenerateStore()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">选择故事模板</h1>
        <p className="text-sm text-gray-500 mt-1">选择一个最适合你内容的叙事类型</p>
      </div>

      <TemplateGrid selectedId={templateId} onSelect={setTemplate} />

      <div className="flex justify-end mt-8">
        <Button
          disabled={!templateId}
          onClick={() => router.push('/generate/narrative')}
        >
          下一步：选择叙事链条 <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}
