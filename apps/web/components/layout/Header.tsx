'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname?.includes('/persona')) return '人设管理'
    if (pathname?.includes('/generate')) return '生成脚本'
    if (pathname?.includes('/scripts')) return '脚本管理'
    if (pathname?.includes('/dashboard')) return '工作台'
    return 'ScriptAI'
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600 text-white">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:inline">ScriptAI</span>
          </Link>
        </div>
        <h1 className="text-sm font-medium text-gray-600 lg:hidden">{getTitle()}</h1>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-sm font-medium text-primary-700">U</span>
          </div>
        </div>
      </div>
    </header>
  )
}
