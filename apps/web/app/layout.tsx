import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ScriptAI - AI 短视频脚本生成器',
  description: '面向抖音/TikTok 创作者的 AI 拍摄脚本生成工具',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
