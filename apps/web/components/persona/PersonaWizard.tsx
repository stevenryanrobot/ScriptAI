'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stepTransition } from '@/lib/animations'
import { StepCard } from './StepCard'
import { TagSelector } from './TagSelector'
import { BackgroundInput } from './BackgroundInput'
import { Input, TextArea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'
import { usePersona } from '@/hooks/usePersona'
import { useRouter } from 'next/navigation'
import {
  ACCOUNT_TYPE_LABELS, ACCOUNT_TYPE_ICONS, STYLE_TONE_OPTIONS,
  type AccountType, type Persona
} from '@/types'
import {
  BookOpen, Camera, Heart, Smile, Star, Cpu, Sparkles,
  Dumbbell, UtensilsCrossed, MoreHorizontal, ChevronRight, ChevronLeft, Check
} from 'lucide-react'

const iconMap: Record<string, any> = {
  BookOpen, Camera, Heart, Smile, Star, Cpu, Sparkles,
  Dumbbell, UtensilsCrossed, MoreHorizontal,
}

const AGE_RANGES = ['18岁以下', '18-24岁', '25-34岁', '35-44岁', '45岁以上', '全年龄段']
const INTEREST_OPTIONS = ['科技', '美妆', '健身', '美食', '旅行', '教育', '金融', '娱乐', '时尚', '游戏', '职场', '育儿']
const VIDEO_TYPES = ['教程', '评测', '故事', 'Vlog', '搞笑', '知识', '情感', '挑战']
const THEME_OPTIONS = ['成长', '生活', '职场', '恋爱', '学习', '健康', '理财', '创业']

const TOTAL_STEPS = 5

export function PersonaWizard() {
  const router = useRouter()
  const { savePersona } = usePersona()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    nickname: '',
    accountName: '',
    accountType: '' as AccountType | '',
    ageRange: '25-34岁',
    interests: [] as string[],
    painPoints: '',
    styleTone: [] as string[],
    backgroundStory: '',
    videoTypes: [] as string[],
    themes: [] as string[],
  })

  const updateForm = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await savePersona({
        nickname: form.nickname || '未命名',
        accountName: form.accountName || null,
        accountType: (form.accountType || 'OTHER') as AccountType,
        targetAudience: {
          ageRange: form.ageRange,
          interests: form.interests,
          painPoints: form.painPoints.split(/[,，、]/).filter(Boolean),
        },
        styleTone: form.styleTone,
        backgroundStory: form.backgroundStory || null,
        contentPrefs: {
          videoTypes: form.videoTypes,
          themes: form.themes,
        },
      })
      router.push('/dashboard')
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const canNext = () => {
    if (step === 1) return form.nickname.trim().length > 0
    if (step === 2) return form.accountType !== ''
    return true
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i + 1 <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i + 1 < step ? <Check size={16} /> : i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div className={`flex-1 h-0.5 ${i + 1 < step ? 'bg-primary-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepCard key="step1" title="基本信息" subtitle="告诉我们你的昵称和账号名称">
            <div className="space-y-4">
              <Input
                label="昵称"
                placeholder="如：小王说科技"
                value={form.nickname}
                onChange={(e) => updateForm('nickname', e.target.value)}
              />
              <Input
                label="账号名称（可选）"
                placeholder="你在平台上的账号名"
                value={form.accountName}
                onChange={(e) => updateForm('accountName', e.target.value)}
                hint="如果跟昵称一样可以不填"
              />
            </div>
          </StepCard>
        )}

        {step === 2 && (
          <StepCard key="step2" title="账号类型" subtitle="选择最符合你的账号类型">
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(ACCOUNT_TYPE_LABELS) as [AccountType, string][]).map(([type, label]) => {
                const IconComp = iconMap[ACCOUNT_TYPE_ICONS[type]] || MoreHorizontal
                const selected = form.accountType === type
                return (
                  <Card
                    key={type}
                    hover
                    selected={selected}
                    padding="sm"
                    onClick={() => updateForm('accountType', type)}
                  >
                    <div className="flex items-center gap-2">
                      <IconComp size={20} className={selected ? 'text-primary-600' : 'text-gray-400'} />
                      <span className={`text-sm font-medium ${selected ? 'text-primary-700' : 'text-gray-700'}`}>
                        {label}
                      </span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </StepCard>
        )}

        {step === 3 && (
          <StepCard key="step3" title="目标受众" subtitle="你的内容主要面向谁？">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">年龄段</label>
                <div className="flex flex-wrap gap-2">
                  {AGE_RANGES.map((range) => (
                    <Tag
                      key={range}
                      label={range}
                      selected={form.ageRange === range}
                      onClick={() => updateForm('ageRange', range)}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
              <TagSelector
                label="兴趣标签"
                options={INTEREST_OPTIONS}
                selected={form.interests}
                onChange={(v) => updateForm('interests', v)}
              />
              <Input
                label="受众痛点关键词"
                placeholder="用逗号分隔，如：不会剪辑，缺乏灵感"
                value={form.painPoints}
                onChange={(e) => updateForm('painPoints', e.target.value)}
                hint="描述你的受众遇到的问题"
              />
            </div>
          </StepCard>
        )}

        {step === 4 && (
          <StepCard key="step4" title="风格调性" subtitle="选择你的创作风格（可多选）">
            <div className="flex flex-wrap gap-2">
              {STYLE_TONE_OPTIONS.map((tone) => (
                <Tag
                  key={tone}
                  label={tone}
                  selected={form.styleTone.includes(tone)}
                  onClick={() =>
                    updateForm(
                      'styleTone',
                      form.styleTone.includes(tone)
                        ? form.styleTone.filter((t) => t !== tone)
                        : [...form.styleTone, tone]
                    )
                  }
                />
              ))}
            </div>
          </StepCard>
        )}

        {step === 5 && (
          <StepCard key="step5" title="更多信息（可选）" subtitle="帮助 AI 更好地理解你">
            <div className="space-y-5">
              <BackgroundInput
                value={form.backgroundStory}
                onChange={(v) => updateForm('backgroundStory', v)}
              />
              <TagSelector
                label="偏好视频类型"
                options={VIDEO_TYPES}
                selected={form.videoTypes}
                onChange={(v) => updateForm('videoTypes', v)}
              />
              <TagSelector
                label="内容主题"
                options={THEME_OPTIONS}
                selected={form.themes}
                onChange={(v) => updateForm('themes', v)}
              />
            </div>
          </StepCard>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <div>
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)} icon={<ChevronLeft size={16} />}>
              上一步
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {step < TOTAL_STEPS && step >= 3 && (
            <Button variant="ghost" onClick={() => setStep(step + 1)}>
              跳过
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
              下一步 <ChevronRight size={16} />
            </Button>
          ) : (
            <Button onClick={handleSave} loading={saving}>
              完成建档
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
