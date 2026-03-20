'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wand2, FileText, User, TrendingUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cardEnter, staggerContainer, fadeInUp } from '@/lib/animations'

const quickActions = [
  { href: '/generate/template', icon: Wand2, label: '生成新脚本', color: 'bg-primary-100 text-primary-600' },
  { href: '/scripts', icon: FileText, label: '查看脚本库', color: 'bg-blue-100 text-blue-600' },
  { href: '/persona/setup', icon: User, label: '编辑人设', color: 'bg-green-100 text-green-600' },
]

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">欢迎回来 👋</h1>
        <p className="text-gray-500 mt-1">今天想创作什么样的短视频？</p>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {quickActions.map((action) => (
          <motion.div key={action.href} variants={fadeInUp}>
            <Link href={action.href}>
              <Card hover padding="lg" className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                  <action.icon size={24} />
                </div>
                <span className="font-semibold text-gray-900">{action.label}</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Card */}
      <Card padding="lg" className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
          <Plus size={32} className="text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">开始创作你的第一个脚本</h3>
        <p className="text-sm text-gray-500 mb-4">选择故事模板，AI 为你生成完整的拍摄脚本</p>
        <Link href="/generate/template">
          <Button icon={<Wand2 size={18} />}>
            立即生成
          </Button>
        </Link>
      </Card>
    </div>
  )
}
