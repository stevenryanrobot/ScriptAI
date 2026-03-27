'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Sparkles, Plus, X, Loader2 } from 'lucide-react';

const templateNames: Record<string, string> = {
  tech_review: '评测种草',
  daily_slice: '日常切片',
  knowledge: '知识输出',
  emotional: '情感共鸣',
  review: '评测种草',
  comparison: '对比拆解',
  challenge: '挑战记录',
  behind_scenes: '幕后揭秘',
};

const narrativeNames: Record<string, string> = {
  HOOK_CONTENT_CTA: '经典三段式',
  PROBLEM_SOLUTION: '问题 - 解决',
  STORY_ARC: '故事叙述',
  BEFORE_AFTER: '前后对比',
  LISTICLE: '清单罗列',
  MYTH_BUSTING: '辟谣反转',
};

function CreateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [elements, setElements] = useState<string[]>([]);
  const [currentElement, setCurrentElement] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [templateId, setTemplateId] = useState('tech_review');
  const [narrativeType, setNarrativeType] = useState('HOOK_CONTENT_CTA');

  useEffect(() => {
    const template = searchParams.get('template');
    const narrative = searchParams.get('narrative');
    if (template) setTemplateId(template);
    if (narrative) setNarrativeType(narrative);
  }, [searchParams]);

  const handleAddElement = () => {
    if (currentElement.trim() && !elements.includes(currentElement.trim())) {
      setElements([...elements, currentElement.trim()]);
      setCurrentElement('');
    }
  };

  const handleRemoveElement = (element: string) => {
    setElements(elements.filter(e => e !== element));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddElement();
    }
  };

  const handleGenerate = async () => {
    if (elements.length === 0) {
      alert('请至少添加一个元素');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          persona: { nickname: '测试 AI' },
          templateId,
          narrativeType,
          elements,
          customPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('生成失败');
      }

      // 处理 SSE 流式响应
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsGenerating(false);
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                setGeneratedContent(prev => prev + parsed.text);
              } else if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }
    } catch (error) {
      console.error('生成错误:', error);
      setGeneratedContent('生成失败，请稍后重试。');
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    // TODO: 保存到数据库
    alert('脚本已保存（演示）');
    router.push('/scripts');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('已复制到剪贴板');
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
        <h1 className="text-2xl font-bold text-gray-900">生成脚本</h1>
        <p className="text-gray-600 mt-1">输入关键元素，AI 将为你生成完整脚本</p>
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
          <span className="text-sm text-gray-600">选择叙事链</span>
        </div>
        <div className="w-8 h-px bg-gray-300"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <span className="text-sm font-medium text-primary-700">输入元素</span>
        </div>
      </div>

      {/* 当前配置信息 */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-4 mb-6 border border-primary-100">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-gray-500">模板：</span>
            <span className="font-medium text-gray-900">{templateNames[templateId] || templateId}</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div>
            <span className="text-gray-500">叙事链：</span>
            <span className="font-medium text-gray-900">{narrativeNames[narrativeType] || narrativeType}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 左侧：输入区域 */}
        <div className="space-y-6">
          {/* 元素输入 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">关键元素</h3>
            <p className="text-sm text-gray-600 mb-4">添加你想在脚本中提到的关键词、产品、场景等</p>

            {/* 已添加的元素标签 */}
            {elements.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {elements.map((element) => (
                  <span
                    key={element}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm"
                  >
                    {element}
                    <button
                      onClick={() => handleRemoveElement(element)}
                      className="hover:text-primary-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* 输入框 */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentElement}
                onChange={(e) => setCurrentElement(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入元素，按回车添加"
                className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
              />
              <button
                onClick={handleAddElement}
                className="px-4 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* 建议标签 */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">建议：</span>
              {['产品名', '使用场景', '目标人群', '核心卖点'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setCurrentElement(suggestion)}
                  className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs hover:bg-gray-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* 自定义提示词 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">自定义要求（可选）</h3>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="例如：语气要幽默、加入网络热梗、控制在 30 秒以内..."
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 resize-none"
            />
          </div>

          {/* 生成按钮 */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || elements.length === 0}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-colors ${
              isGenerating || elements.length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI 正在创作中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                开始生成脚本
              </>
            )}
          </button>
        </div>

        {/* 右侧：生成结果 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:sticky lg:top-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">生成结果</h3>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                >
                  复制
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-700"
                >
                  保存
                </button>
              </div>
            )}
          </div>

          <div className="min-h-[400px] rounded-lg bg-gray-50 p-4 border border-gray-200">
            {isGenerating && !generatedContent ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p className="text-sm">AI 正在思考创作中...</p>
              </div>
            ) : generatedContent ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-900 whitespace-pre-wrap">{generatedContent}</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Sparkles className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm">输入元素后点击生成</p>
              </div>
            )}
          </div>

          {/* 使用提示 */}
          {!generatedContent && (
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-xs text-blue-800">
                <strong>💡 提示：</strong>元素越具体，生成的脚本越精准。建议添加 3-5 个关键元素。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">加载中...</div>}>
      <CreateContent />
    </Suspense>
  );
}
