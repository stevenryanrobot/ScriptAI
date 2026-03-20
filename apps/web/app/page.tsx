'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Wand2, Layout, FileText, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const features = [
  { icon: Wand2, title: '智能人设建档', desc: '引导式问答，3 分钟完成人设配置' },
  { icon: Layout, title: '多种叙事模板', desc: '8 大故事模板 + 3 种叙事链条' },
  { icon: FileText, title: '分镜头脚本', desc: 'AI 生成包含台词、画面、BGM 的完整脚本' },
  { icon: Zap, title: '实时流式输出', desc: '边生成边预览，秒级响应' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">ScriptAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">登录</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">免费开始</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles size={16} />
            AI 驱动的短视频脚本创作工具
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            3 分钟生成
            <br />
            <span className="text-primary-600">专业拍摄脚本</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            输入你的人设信息，选择故事模板和叙事结构，AI 自动生成包含分镜头、台词、画面描述、BGM 建议的完整拍摄脚本。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="px-8">
                免费开始创作 <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                已有账号？登录
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <f.icon size={24} className="text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">开始你的创作之旅</h2>
          <p className="text-primary-100 mb-8 max-w-md mx-auto">
            免费用户每天可生成 3 条脚本，无需信用卡
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 px-8">
              立即注册 <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © 2024 ScriptAI. All rights reserved.
      </footer>
    </div>
  )
}
