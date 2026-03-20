'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Wand2, FileText } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: '工作台', icon: LayoutDashboard },
  { href: '/persona/setup', label: '人设', icon: User },
  { href: '/generate/template', label: '生成', icon: Wand2 },
  { href: '/scripts', label: '脚本', icon: FileText },
]

export function MobileNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname?.startsWith(href)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-1 ${
              isActive(item.href) ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <item.icon size={22} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
