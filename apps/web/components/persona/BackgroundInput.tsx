'use client'
import { TextArea } from '@/components/ui/Input'

interface BackgroundInputProps {
  value: string
  onChange: (value: string) => void
}

export function BackgroundInput({ value, onChange }: BackgroundInputProps) {
  return (
    <TextArea
      label="背景故事（可选）"
      placeholder="简单描述你的经历、为什么做这个账号、你的特别之处...&#10;&#10;例如：我是一名工作了 5 年的前端工程师，平时喜欢分享技术干货和职场经验。我的账号主要想帮助刚入行的程序员少走弯路。"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
      hint="帮助 AI 更好地理解你的人设，生成更贴合的脚本"
    />
  )
}
