'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeft, Zap, Heart, TrendingUp, Clock, Target, Sparkles } from 'lucide-react';

const narrativeTypes = [
  {
    id: 'HOOK_CONTENT_CTA',
    name: '经典三段式',
    description: '开头吸引注意 → 中间输出内容 → 结尾引导互动',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    suitable: '通用型，适合大多数内容',
  },
  {
    id: 'PROBLEM_SOLUTION',
    name: '问题 - 解决',
    description: '提出痛点问题 → 给出解决方案 → 展示效果对比',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    suitable: '知识分享、产品推荐',
  },
  {
    id: 'STORY_ARC',
    name: '故事叙述',
    description: '设置场景 → 冲突发展 → 高潮转折 → 结局感悟',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    suitable: '情感共鸣、个人经历',
  },
  {
    id: 'BEFORE_AFTER',
    name: '前后对比',
    description: '展示之前状态 → 介绍改变方法 → 呈现之后效果',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    suitable: '产品测评、改变记录',
  },
  {
    id: 'LISTICLE',
    name: '清单罗列',
    description: '总起引入 → 分点说明 (3-5 个) → 总结建议',
    icon: Clock,
    color: 'from-purple-500 to-violet-500',
    suitable: '干货分享、资源整理',
  },
  {
    id: 'MYTH_BUSTING',
    name: '辟谣反转',
    description: '提出常见误区 → 逐条反驳 → 给出正确认知',
    icon: Sparkles,
    color: 'from-red-500 to-pink-500',
    suitable: '知识科普、观点输出',
  },
];

function NarrativeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedNarrative, setSelectedNarrative] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);

  useEffect(() => {
    const template = searchParams.get('template');
    if (template) setTemplateId(template);
  }, [searchParams]);

  const handleContinue = () => {
    if (selectedNarrative) {
      // 跳转到生成页面，传递模板和叙事链
      router.push(`/generate/create?template=${templateId || 'tech_review'}&narrative=${selectedNarrative}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </button>

      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">选择叙事链条</h1>
        <p className="text-gray-600 mt-1">选择适合你内容的叙述结构</p>
      </div>

      {/* 进度指示 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <span className="text-sm text-gray-600">选择模板</span>
        </div>
        <div className="w-8 h-px bg-gray-300"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <span className="text-sm font-medium text-primary-700">选择叙事链</span>
        </div>
        <div className="w-8 h-px bg-gray-300"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <span className="text-sm text-gray-500">输入元素</span>
        </div>
      </div>

      {/* 叙事链选项 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {narrativeTypes.map((narrative) => {
          const Icon = narrative.icon;
          const isSelected = selectedNarrative === narrative.id;
          
          return (
            <button
              key={narrative.id}
              onClick={() => setSelectedNarrative(narrative.id)}
              className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${narrative.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                    {narrative.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {narrative.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 {narrative.suitable}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 选中提示 */}
      {selectedNarrative && (
        <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>已选择：</strong>
            {narrativeTypes.find(n => n.id === selectedNarrative)?.name}
            {' - '}
            {narrativeTypes.find(n => n.id === selectedNarrative)?.description}
          </p>
        </div>
      )}

      {/* 下一步按钮 */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          上一步
        </button>
        
        <button
          onClick={handleContinue}
          disabled={!selectedNarrative}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            selectedNarrative
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          下一步：输入元素
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function NarrativePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">加载中...</div>}>
      <NarrativeContent />
    </Suspense>
  );
}
