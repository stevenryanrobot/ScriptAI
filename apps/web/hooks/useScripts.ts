'use client'
import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'
import type { Script } from '@/types'

export function useScripts() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)

  const fetchScripts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiFetch<Script[]>('/api/scripts')
      setScripts(data)
    } catch {
      setScripts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchScripts() }, [fetchScripts])

  const toggleFavorite = async (id: string) => {
    await apiFetch(`/api/scripts/${id}/favorite`, { method: 'POST' })
    setScripts((prev) => prev.map((s) => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
  }

  const deleteScript = async (id: string) => {
    await apiFetch(`/api/scripts/${id}`, { method: 'DELETE' })
    setScripts((prev) => prev.filter((s) => s.id !== id))
  }

  return { scripts, loading, fetchScripts, toggleFavorite, deleteScript }
}
