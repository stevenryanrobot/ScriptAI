'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Sparkles, Menu, User, Settings, LogOut } from 'lucide-react'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const getTitle = () => {
    if (pathname?.includes('/persona')) return '人设管理'
    if (pathname?.includes('/generate')) return '生成脚本'
    if (pathname?.includes('/scripts')) return '脚本管理'
    if (pathname?.includes('/dashboard')) return '工作台'
    if (pathname?.includes('/profile')) return '个人信息'
    if (pathname?.includes('/settings')) return '设置'
    return 'ScriptAI'
  }

  const handleLogout = () => {
    // TODO: 实现登出逻辑
    alert('登出功能（演示）')
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
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-colors"
          >
            <span className="text-sm font-medium text-primary-700">U</span>
          </button>
          
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={16} />
                  个人信息
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings size={16} />
                  设置
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  退出登录
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
