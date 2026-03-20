'use client'
import { Tag } from '@/components/ui/Tag'

interface TagSelectorProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  max?: number
}

export function TagSelector({ label, options, selected, onChange, max }: TagSelectorProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else if (!max || selected.length < max) {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {max && <span className="text-gray-400 font-normal ml-1">（最多 {max} 个）</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Tag
            key={option}
            label={option}
            selected={selected.includes(option)}
            disabled={!!max && selected.length >= max && !selected.includes(option)}
            onClick={() => toggle(option)}
            size="sm"
          />
        ))}
      </div>
    </div>
  )
}
