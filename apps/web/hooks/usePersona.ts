'use client'
import { useState, useEffect } from 'react'
import { apiFetch } from '@/lib/api'
import type { Persona } from '@/types'

export function usePersona() {
  const [persona, setPersona] = useState<Persona | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch<Persona>('/api/persona')
      .then(setPersona)
      .catch(() => setPersona(null))
      .finally(() => setLoading(false))
  }, [])

  const savePersona = async (data: Partial<Persona>) => {
    const saved = await apiFetch<Persona>('/api/persona', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    setPersona(saved)
    return saved
  }

  return { persona, loading, savePersona }
}
