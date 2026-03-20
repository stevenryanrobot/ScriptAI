import { create } from 'zustand'
import type { NarrativeType } from '@/types'

interface GenerateState {
  templateId: string | null
  narrativeType: NarrativeType | null
  elements: string[]
  customPrompt: string

  setTemplate: (id: string) => void
  setNarrative: (type: NarrativeType) => void
  toggleElement: (id: string) => void
  setCustomPrompt: (prompt: string) => void
  reset: () => void
}

export const useGenerateStore = create<GenerateState>((set, get) => ({
  templateId: null,
  narrativeType: null,
  elements: [],
  customPrompt: '',

  setTemplate: (id) => set({ templateId: id }),
  setNarrative: (type) => set({ narrativeType: type }),
  toggleElement: (id) => {
    const { elements } = get()
    if (elements.includes(id)) {
      set({ elements: elements.filter((e) => e !== id) })
    } else if (elements.length < 5) {
      set({ elements: [...elements, id] })
    }
  },
  setCustomPrompt: (prompt) => set({ customPrompt: prompt }),
  reset: () => set({ templateId: null, narrativeType: null, elements: [], customPrompt: '' }),
}))
