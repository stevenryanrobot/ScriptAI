export interface StoryTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  suitableFor: string[];
  exampleHook: string;
  color: string;
  promptTemplate: string;
}

export interface NarrativeChain {
  id: NarrativeType;
  name: string;
  description: string;
  suitableDuration: string;
  nodes: NarrativeNode[];
}

export interface NarrativeNode {
  id: string;
  label: string;
  description: string;
  durationHint: string;
}

export type NarrativeType = 'FOUR_ACT' | 'THREE_PART' | 'HOOK_CONTENT_CTA' | 'CUSTOM';

export type AccountType =
  | 'KNOWLEDGE' | 'VLOG' | 'EMOTION' | 'COMEDY'
  | 'REVIEW' | 'TECH' | 'BEAUTY' | 'FITNESS'
  | 'FOOD' | 'OTHER';

export type ScriptStatus = 'DRAFT' | 'COMPLETED' | 'ARCHIVED';

export interface Shot {
  shotNumber: number;
  narration: string;
  visualDescription: string;
  subtitle: string;
  duration: number;
  bgmSuggestion: string;
  notes?: string;
}

export interface Script {
  id: string;
  title: string;
  templateId: string;
  narrativeType: NarrativeType;
  elements: string[];
  shots: Shot[];
  totalDuration: number | null;
  isFavorite: boolean;
  tags: string[];
  status: ScriptStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Persona {
  id: string;
  nickname: string;
  accountName: string | null;
  accountType: AccountType;
  targetAudience: {
    ageRange: string;
    interests: string[];
    painPoints: string[];
  };
  styleTone: string[];
  backgroundStory: string | null;
  contentPrefs: {
    videoTypes: string[];
    themes: string[];
  } | null;
}

export interface PlotElement {
  id: string;
  label: string;
  category: 'opening' | 'development' | 'highlight' | 'ending';
}

export interface GenerateParams {
  templateId: string;
  narrativeType: NarrativeType;
  elements: string[];
  customPrompt?: string;
}

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  KNOWLEDGE: '知识博主',
  VLOG: '生活 Vlog',
  EMOTION: '情感类',
  COMEDY: '搞笑',
  REVIEW: '评测种草',
  TECH: '科技',
  BEAUTY: '美妆',
  FITNESS: '健身',
  FOOD: '美食',
  OTHER: '其他',
};

export const ACCOUNT_TYPE_ICONS: Record<AccountType, string> = {
  KNOWLEDGE: 'BookOpen',
  VLOG: 'Camera',
  EMOTION: 'Heart',
  COMEDY: 'Smile',
  REVIEW: 'Star',
  TECH: 'Cpu',
  BEAUTY: 'Sparkles',
  FITNESS: 'Dumbbell',
  FOOD: 'UtensilsCrossed',
  OTHER: 'MoreHorizontal',
};

export const STYLE_TONE_OPTIONS = [
  '幽默搞笑', '温暖治愈', '犬儒毒舌', '理性分析', '热血励志',
  '文艺清新', '接地气', '专业权威', '轻松日常', '情绪共鸣',
] as const;

export const PLOT_ELEMENTS: PlotElement[] = [
  { id: 'suspense_open', label: '悬念开场', category: 'opening' },
  { id: 'question_hook', label: '提问引入', category: 'opening' },
  { id: 'scene_setting', label: '场景铺垫', category: 'opening' },
  { id: 'conflict', label: '制造冲突', category: 'development' },
  { id: 'emotional_peak', label: '情绪高潮', category: 'development' },
  { id: 'twist', label: '反转', category: 'development' },
  { id: 'data_proof', label: '数据佐证', category: 'development' },
  { id: 'personal_story', label: '个人经历', category: 'development' },
  { id: 'golden_quote', label: '金句', category: 'highlight' },
  { id: 'analogy', label: '类比说明', category: 'highlight' },
  { id: 'cta_follow', label: '引导关注', category: 'ending' },
  { id: 'cta_comment', label: '引导评论', category: 'ending' },
  { id: 'cta_share', label: '引导分享', category: 'ending' },
  { id: 'cliff_hanger', label: '留悬念（下集预告）', category: 'ending' },
];

export const PLOT_ELEMENT_CATEGORIES = {
  opening: '开场类',
  development: '发展类',
  highlight: '亮点类',
  ending: '结尾类',
} as const;

export const STORY_TEMPLATES: StoryTemplate[] = [
  {
    id: 'reversal',
    name: '逆袭反转',
    icon: 'TrendingUp',
    description: '从低谷到高光的反转叙事',
    suitableFor: ['励志', '成长'],
    exampleHook: '"三个月前，我还在出租屋里吃泡面..."',
    color: 'bg-gradient-to-br from-orange-400 to-rose-500',
    promptTemplate: '请创作一个"逆袭反转"类型的短视频脚本。叙事要从低谷/困境开始，逐步展现努力过程，最终呈现反转高光时刻。关键是要让观众产生"意想不到"的惊喜感。',
  },
  {
    id: 'daily_slice',
    name: '日常切片',
    icon: 'Coffee',
    description: '生活场景的小故事',
    suitableFor: ['Vlog', '生活方式'],
    exampleHook: '"今天发生了一件特别有意思的事..."',
    color: 'bg-gradient-to-br from-green-400 to-emerald-500',
    promptTemplate: '请创作一个"日常切片"类型的短视频脚本。从一个真实的生活场景切入，捕捉日常中的小美好、小感悟或小趣事，让观众产生共鸣和代入感。',
  },
  {
    id: 'knowledge',
    name: '知识输出',
    icon: 'Lightbulb',
    description: '干货分享结构',
    suitableFor: ['知识博主', '行业解读'],
    exampleHook: '"99% 的人都不知道的一个技巧..."',
    color: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    promptTemplate: '请创作一个"知识输出"类型的短视频脚本。以一个引人好奇的知识点切入，用通俗易懂的方式讲解干货，让观众觉得"学到了"。结构要清晰，信息密度适中。',
  },
  {
    id: 'emotional',
    name: '情感共鸣',
    icon: 'Heart',
    description: '热点话题的观点表达',
    suitableFor: ['情感账号'],
    exampleHook: '"你有没有过这样的时刻..."',
    color: 'bg-gradient-to-br from-pink-400 to-purple-500',
    promptTemplate: '请创作一个"情感共鸣"类型的短视频脚本。围绕一个能引起广泛共鸣的情感话题，表达真实、有温度的观点，让观众觉得"说的就是我"。',
  },
  {
    id: 'review',
    name: '评测种草',
    icon: 'Star',
    description: '产品体验 + 个人观点',
    suitableFor: ['好物推荐'],
    exampleHook: '"用了三个月，终于可以说说真实感受了..."',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    promptTemplate: '请创作一个"评测种草"类型的短视频脚本。从真实使用体验出发，客观展示产品优缺点，给出个人推荐意见，让观众做出购买决策。',
  },
  {
    id: 'comparison',
    name: '对比拆解',
    icon: 'GitCompare',
    description: 'A vs B 对比分析',
    suitableFor: ['科技', '美妆'],
    exampleHook: '"都说 A 好，但跟 B 一比你就知道了..."',
    color: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    promptTemplate: '请创作一个"对比拆解"类型的短视频脚本。选取两个相似的事物/产品进行全方位对比，通过数据和体验说明差异，帮助观众做出选择。',
  },
  {
    id: 'challenge',
    name: '挑战记录',
    icon: 'Trophy',
    description: '挑战某件事的过程记录',
    suitableFor: ['健身', '学习'],
    exampleHook: '"我决定用 30 天挑战..."',
    color: 'bg-gradient-to-br from-violet-400 to-purple-500',
    promptTemplate: '请创作一个"挑战记录"类型的短视频脚本。设定一个具体的挑战目标，记录过程中的困难和突破，展现坚持的意义和最终的成果。',
  },
  {
    id: 'behind_scenes',
    name: '幕后揭秘',
    icon: 'Eye',
    description: '展示不为人知的过程/真相',
    suitableFor: ['各类型账号'],
    exampleHook: '"你看到的只是表面，背后其实..."',
    color: 'bg-gradient-to-br from-slate-400 to-gray-600',
    promptTemplate: '请创作一个"幕后揭秘"类型的短视频脚本。展示某个事物/行业/现象背后不为人知的过程或真相，满足观众的好奇心，让人觉得"涨知识了"。',
  },
];

export const NARRATIVE_CHAINS: NarrativeChain[] = [
  {
    id: 'FOUR_ACT',
    name: '四幕式',
    description: '紧凑有力，适合 15-30 秒短视频',
    suitableDuration: '15-30s',
    nodes: [
      { id: 'hook', label: '悬念开场', description: '用一句话或画面抓住注意力', durationHint: '3-5s' },
      { id: 'conflict', label: '制造冲突', description: '引出核心矛盾或问题', durationHint: '5-8s' },
      { id: 'twist', label: '反转/解答', description: '出人意料的转折或干货揭晓', durationHint: '5-10s' },
      { id: 'cta', label: '强 CTA', description: '引导点赞、关注、评论', durationHint: '3-5s' },
    ],
  },
  {
    id: 'THREE_PART',
    name: '三段式',
    description: '经典结构，适合 30-60 秒视频',
    suitableDuration: '30-60s',
    nodes: [
      { id: 'intro', label: '开场引入', description: '建立场景，引出话题', durationHint: '5-10s' },
      { id: 'body', label: '核心内容', description: '主体内容展开', durationHint: '15-30s' },
      { id: 'ending', label: '结尾召唤', description: '总结升华 + 行动号召', durationHint: '5-10s' },
    ],
  },
  {
    id: 'HOOK_CONTENT_CTA',
    name: 'Hook+内容+CTA',
    description: '最通用的结构，适合任意时长',
    suitableDuration: '15-60s',
    nodes: [
      { id: 'hook', label: '开屏抓人', description: '前 3 秒决定用户是否继续看', durationHint: '3s' },
      { id: 'content', label: '主体展开', description: '核心价值内容', durationHint: '10-40s' },
      { id: 'cta', label: '行动召唤', description: '明确告诉观众下一步做什么', durationHint: '3-5s' },
    ],
  },
];
