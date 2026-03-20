'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
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
        setError('注册失败，请重试')
      } else {
        router.push('/persona/setup')
      }
    } catch {
      setError('注册失败')
    } finally {
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
          <h1 className="text-2xl font-bold text-gray-900">注册 ScriptAI</h1>
          <p className="text-sm text-gray-500 mt-2">免费开始，每天 3 次脚本生成</p>
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
            placeholder="设置密码（至少 6 位）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            hint="至少 6 个字符"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">
            创建账号
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          已有账号？
          <Link href="/login" className="text-primary-600 font-medium hover:underline ml-1">
            立即登录
          </Link>
        </p>
      </div>
    </div>
  )
}
