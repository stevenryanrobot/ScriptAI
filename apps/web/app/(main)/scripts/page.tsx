'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScripts } from '@/hooks/useScripts'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Search, Heart, Trash2, FileText, Plus, Wand2 } from 'lucide-react'
import { STORY_TEMPLATES } from '@/types'

export default function ScriptsPage() {
  const { scripts, loading, toggleFavorite, deleteScript } = useScripts()
  const [search, setSearch] = useState('')
  const [filterFav, setFilterFav] = useState(false)

  const filtered = scripts.filter((s) => {
    if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false
    if (filterFav && !s.isFavorite) return false
    return true
  })

  const getTemplateName = (id: string) => STORY_TEMPLATES.find((t) => t.id === id)?.name || id

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">脚本管理</h1>
        <Link href="/generate/template">
          <Button size="sm" icon={<Plus size={16} />}>新建脚本</Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
            placeholder="搜索脚本..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setFilterFav(!filterFav)}
          className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
            filterFav ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Heart size={16} className={filterFav ? 'fill-current' : ''} />
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {scripts.length === 0 ? '还没有脚本，去创建第一个吧' : '没有匹配的脚本'}
          </p>
          {scripts.length === 0 && (
            <Link href="/generate/template">
              <Button icon={<Wand2 size={16} />}>生成脚本</Button>
            </Link>
          )}
        </div>
      ) : (
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
          {filtered.map((script) => (
            <motion.div key={script.id} variants={fadeInUp}>
              <Link href={`/scripts/${script.id}`}>
                <Card hover padding="md" className="flex items-center justify-between group">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {script.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">
                        {getTemplateName(script.templateId)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(script.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={() => toggleFavorite(script.id)}
                      className={`p-2 rounded-lg hover:bg-gray-100 ${script.isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                    >
                      <Heart size={16} className={script.isFavorite ? 'fill-current' : ''} />
                    </button>
                    <button
                      onClick={() => { if (confirm('确认删除？')) deleteScript(script.id) }}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
