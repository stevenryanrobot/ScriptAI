'use client'
import { Tag } from '@/components/ui/Tag'
import { PLOT_ELEMENTS, PLOT_ELEMENT_CATEGORIES } from '@/types'

interface ElementPickerProps {
  selected: string[]
  onToggle: (id: string) => void
  max?: number
}

export function ElementPicker({ selected, onToggle, max = 5 }: ElementPickerProps) {
  const categories = Object.entries(PLOT_ELEMENT_CATEGORIES) as [keyof typeof PLOT_ELEMENT_CATEGORIES, string][]
  const atLimit = selected.length >= max

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">选择你希望脚本包含的情节元素</p>
        <span className={`text-sm font-medium ${atLimit ? 'text-amber-600' : 'text-gray-400'}`}>
          {selected.length}/{max}
        </span>
      </div>
      {categories.map(([category, label]) => {
        const elements = PLOT_ELEMENTS.filter((e) => e.category === category)
        return (
          <div key={category}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{label}</h4>
            <div className="flex flex-wrap gap-2">
              {elements.map((el) => (
                <Tag
                  key={el.id}
                  label={el.label}
                  selected={selected.includes(el.id)}
                  disabled={atLimit && !selected.includes(el.id)}
                  onClick={() => onToggle(el.id)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
