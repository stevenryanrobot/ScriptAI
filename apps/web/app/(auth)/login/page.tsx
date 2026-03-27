'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        setError('登录失败，请检查邮箱和密码')
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('登录失败')
    } finally {
      setLoading(false)
    }
  }

  const handleWechatLogin = async () => {
    setLoading(true)
    setError('')
    try {
      await signIn('wechat', { callbackUrl: '/dashboard' })
    } catch {
      setError('微信登录失败，请稍后重试')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 text-white mb-4">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">登录 ScriptAI</h1>
          <p className="text-sm text-gray-500 mt-2">开始创作你的短视频脚本</p>
        </div>

        {/* 微信一键登录 */}
        <Button
          onClick={handleWechatLogin}
          className="w-full bg-[#07C160] hover:bg-[#06AD56] text-white mb-4"
          loading={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm4.5 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm9 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.13-.12.68-.39 1.66-.71 2.37-.11.24.13.5.38.38 2.13-.99 3.9-2.05 5.49-3.35.34.05.68.08 1.03.08 5.52 0 10-4.03 10-9S17.52 2 12 2zm0 16c-.31 0-.61-.03-.91-.07l-.45.38c-1.35 1.1-2.92 2.05-4.86 2.94.28-.62.52-1.48.63-2.06l.09-.47-.41-.28C4.06 17.04 2.5 14.5 2.5 11c0-4.69 4.26-8.5 9.5-8.5s9.5 3.81 9.5 8.5-4.26 8.5-9.5 8.5z"/>
          </svg>
          微信一键登录
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">或使用邮箱登录</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="邮箱"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="密码"
            type="password"
            placeholder="输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">
            登录
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          还没有账号？
          <Link href="/register" className="text-primary-600 font-medium hover:underline ml-1">
            免费注册
          </Link>
        </p>
      </div>
    </div>
  )
}
