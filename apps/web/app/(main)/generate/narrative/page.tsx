'use client'
import { useRouter } from 'next/navigation'
import { useGenerateStore } from '@/stores/generateStore'
import { NarrativeFlow } from '@/components/generate/NarrativeFlow'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function NarrativePage() {
  const router = useRouter()
  const { narrativeType, setNarrative } = useGenerateStore()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">选择叙事链条</h1>
        <p className="text-sm text-gray-500 mt-1">选择脚本的叙事结构</p>
      </div>

      <NarrativeFlow selectedType={narrativeType} onSelect={setNarrative} />

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={() => router.push('/generate/template')} icon={<ChevronLeft size={16} />}>
          上一步
        </Button>
        <Button
          disabled={!narrativeType}
          onClick={() => router.push('/generate/elements')}
        >
          下一步：选择情节元素 <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}
