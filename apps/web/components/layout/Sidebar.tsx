'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Wand2, FileText, Settings, Sparkles, Crown } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: '工作台', icon: LayoutDashboard },
  { href: '/persona/setup', label: '人设管理', icon: User },
  { href: '/generate/template', label: '生成脚本', icon: Wand2 },
  { href: '/scripts', label: '脚本管理', icon: FileText },
]

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname?.startsWith(href)

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 px-5 h-14 border-b border-gray-100">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600 text-white">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-lg text-gray-900">ScriptAI</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Pro upgrade card */}
          <div className="px-3 pb-4">
            <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={18} />
                <span className="font-semibold text-sm">升级 Pro</span>
              </div>
              <p className="text-xs text-primary-100 mb-3">无限生成 · 全部模板 · 导出功能</p>
              <button className="w-full py-2 rounded-lg bg-white text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors">
                立即升级
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
