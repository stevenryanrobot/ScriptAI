'use client'
import { Button } from '@/components/ui/Button'
import { RefreshCw, Save, Download, Share2 } from 'lucide-react'

interface ActionBarProps {
  onRegenerateAll: () => void
  onSave: () => void
  onExport: () => void
}

export function ActionBar({ onRegenerateAll, onSave, onExport }: ActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:sticky lg:bottom-4 bg-white border-t lg:border lg:rounded-xl border-gray-200 p-3 lg:p-4 flex items-center justify-between z-30 safe-area-bottom lg:mt-6 lg:shadow-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={onRegenerateAll}
        icon={<RefreshCw size={16} />}
      >
        重新生成
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onExport}
          icon={<Download size={16} />}
        >
          导出
        </Button>
        <Button
          size="sm"
          onClick={onSave}
          icon={<Save size={16} />}
        >
          保存
        </Button>
      </div>
    </div>
  )
}
