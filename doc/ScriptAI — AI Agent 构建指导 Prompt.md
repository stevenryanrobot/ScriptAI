
> 本文档是一份完整的产品构建指令，用于指导 AI Agent（如 Claude Code、Cursor、Windsurf 等）从零构建 ScriptAI 项目。请在开始编码前完整阅读本文档。

---

## 一、项目总览

### 1.1 产品定义

ScriptAI 是一款面向抖音/TikTok 短视频创作者的 AI 拍摄脚本生成工具。用户输入个人人设信息，通过可视化界面选择故事模板和叙事链条，即可一键生成包含分镜头、台词、画面描述、BGM 建议的完整拍摄脚本。

### 1.2 核心用户路径

```
注册/登录 → 引导式人设建档 → 选择故事模板 → 选择叙事链条 → 勾选情节元素 → AI 生成脚本 → 编辑/微调 → 保存/导出
```

### 1.3 技术栈（必须严格遵循）

|层级|技术选型|说明|
|---|---|---|
|前端框架|Next.js 14+ (App Router)|使用 React Server Components，优先移动端体验|
|UI|Tailwind CSS + Framer Motion|现代化 UI，卡片式设计，流畅动画|
|后端 API|Next.js Route Handlers + Python FastAPI|Route Handlers 处理前端 API，FastAPI 处理 AI 生成逻辑|
|AI 引擎|Claude API (claude-sonnet-4-20250514)|脚本生成核心，必须支持 Streaming|
|数据库|PostgreSQL (via Prisma ORM)|用户数据、人设、脚本存储|
|缓存|Redis|会话管理、热点模板缓存|
|认证|NextAuth.js|支持微信/手机号/邮箱登录|
|部署|Vercel (前端) + Railway/Fly.io (FastAPI)|Serverless 架构|

---

## 二、项目目录结构

请严格按以下结构创建项目：

```
scriptai/
├── apps/
│   ├── web/                          # Next.js 前端应用
│   │   ├── app/
│   │   │   ├── (auth)/               # 认证相关页面
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── (main)/               # 主应用页面（需登录）
│   │   │   │   ├── dashboard/page.tsx        # 脚本工作台首页
│   │   │   │   ├── persona/                  # 人设管理
│   │   │   │   │   ├── setup/page.tsx        # 人设引导式建档
│   │   │   │   │   └── edit/page.tsx         # 人设编辑
│   │   │   │   ├── generate/                 # 脚本生成流程
│   │   │   │   │   ├── template/page.tsx     # 选择故事模板
│   │   │   │   │   ├── narrative/page.tsx    # 选择叙事链条
│   │   │   │   │   ├── elements/page.tsx     # 勾选情节元素
│   │   │   │   │   └── result/page.tsx       # 脚本生成结果
│   │   │   │   ├── scripts/                  # 脚本管理
│   │   │   │   │   ├── page.tsx              # 脚本列表
│   │   │   │   │   └── [id]/page.tsx         # 脚本详情/编辑
│   │   │   │   └── layout.tsx
│   │   │   ├── api/                   # Next.js API Routes
│   │   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   │   ├── persona/route.ts
│   │   │   │   ├── scripts/route.ts
│   │   │   │   └── generate/route.ts         # 代理到 FastAPI
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx               # Landing page
│   │   ├── components/
│   │   │   ├── ui/                    # 基础 UI 组件
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Tag.tsx
│   │   │   │   └── Skeleton.tsx
│   │   │   ├── persona/              # 人设模块组件
│   │   │   │   ├── PersonaWizard.tsx         # 引导式表单主组件
│   │   │   │   ├── StepCard.tsx              # 单步卡片
│   │   │   │   ├── TagSelector.tsx           # 标签选择器
│   │   │   │   └── BackgroundInput.tsx       # 背景故事输入
│   │   │   ├── generate/             # 脚本生成模块组件
│   │   │   │   ├── TemplateGrid.tsx          # 故事模板卡片网格
│   │   │   │   ├── TemplateCard.tsx          # 单个模板卡片
│   │   │   │   ├── NarrativeFlow.tsx         # 叙事链条可视化
│   │   │   │   ├── NarrativeNode.tsx         # 叙事节点
│   │   │   │   ├── ElementPicker.tsx         # 情节元素选择器
│   │   │   │   └── GenerateButton.tsx        # 生成按钮（带加载状态）
│   │   │   ├── script/               # 脚本展示模块组件
│   │   │   │   ├── ScriptViewer.tsx          # 脚本预览主组件
│   │   │   │   ├── ShotCard.tsx              # 单镜头卡片
│   │   │   │   ├── ShotEditor.tsx            # 镜头编辑器
│   │   │   │   ├── StreamingRenderer.tsx     # 流式输出渲染
│   │   │   │   └── ActionBar.tsx             # 底部操作栏
│   │   │   └── layout/               # 布局组件
│   │   │       ├── Sidebar.tsx
│   │   │       ├── MobileNav.tsx
│   │   │       └── Header.tsx
│   │   ├── lib/
│   │   │   ├── prisma.ts              # Prisma 客户端
│   │   │   ├── auth.ts                # NextAuth 配置
│   │   │   └── api.ts                 # API 请求封装
│   │   ├── hooks/
│   │   │   ├── usePersona.ts
│   │   │   ├── useScriptGeneration.ts # 处理 SSE 流式输出
│   │   │   └── useScripts.ts
│   │   ├── stores/
│   │   │   └── generateStore.ts       # Zustand store（生成流程状态）
│   │   ├── types/
│   │   │   └── index.ts               # 全局类型定义
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   └── api/                           # Python FastAPI 服务
│       ├── main.py                    # FastAPI 入口
│       ├── routers/
│       │   └── generate.py            # 脚本生成路由
│       ├── services/
│       │   ├── script_engine.py       # AI 脚本生成引擎核心
│       │   └── prompt_builder.py      # Prompt 分层拼接器
│       ├── models/
│       │   └── schemas.py             # Pydantic 数据模型
│       ├── templates/                 # 故事模板定义
│       │   └── story_templates.json
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   └── shared/                        # 前后端共享类型/常量
│       ├── types.ts
│       └── constants.ts
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 三、数据库 Schema（Prisma）

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  phone         String?   @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  persona       Persona?
  scripts       Script[]
  subscription  Subscription?
}

model Persona {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  nickname        String                    // 昵称
  accountName     String?                   // 账号名称
  accountType     AccountType               // 账号类型枚举
  targetAudience  Json                      // { ageRange: string, interests: string[], painPoints: string[] }
  styleTone       String[]                  // 风格调性标签数组
  backgroundStory String?   @db.Text        // 背景故事（可选，长文本）
  contentPrefs    Json?                     // 内容偏好 { videoTypes: string[], themes: string[] }

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum AccountType {
  KNOWLEDGE        // 知识博主
  VLOG             // 生活 Vlog
  EMOTION          // 情感类
  COMEDY           // 搞笑
  REVIEW           // 评测种草
  TECH             // 科技
  BEAUTY           // 美妆
  FITNESS          // 健身
  FOOD             // 美食
  OTHER            // 其他
}

model Script {
  id              String       @id @default(cuid())
  userId          String
  user            User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  title           String                    // 脚本标题
  templateId      String                    // 使用的故事模板 ID
  narrativeType   NarrativeType             // 叙事链条类型
  elements        String[]                  // 选用的情节元素
  shots           Json                      // 分镜头数据（Shot[] 的 JSON）
  totalDuration   Int?                      // 预估总时长（秒）

  isFavorite      Boolean      @default(false)
  tags            String[]                  // 用户自定义标签
  status          ScriptStatus @default(DRAFT)

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@index([userId, createdAt(sort: Desc)])
}

enum NarrativeType {
  FOUR_ACT         // 四幕式
  THREE_PART       // 三段式
  HOOK_CONTENT_CTA // Hook+内容+CTA
  CUSTOM           // 自定义
}

enum ScriptStatus {
  DRAFT
  COMPLETED
  ARCHIVED
}

model Subscription {
  id              String    @id @default(cuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  plan            PlanType  @default(FREE)
  dailyUsed       Int       @default(0)       // 今日已用次数
  dailyResetAt    DateTime  @default(now())    // 每日重置时间
  expiresAt       DateTime?                    // Pro 到期时间

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum PlanType {
  FREE
  PRO
  TEAM
}
```

---

## 四、核心功能实现规范

### 4.1 人设建档系统

**交互规范：**

- 必须使用卡片式分步引导（Wizard 模式），共 5 步，每步只问 1-2 个问题
- 步骤进度指示器固定在顶部，显示当前步骤和总步骤
- 每步均有"跳过"和"下一步"按钮，背景故事为可选项
- 使用 Framer Motion 实现步骤切换的滑动动画（`animatePresence` + `slide`）
- 所有标签选择器使用可点选的胶囊标签（pill tag）样式，支持多选
- 提供智能默认值和 placeholder 示例文案

**步骤详情：**

|步骤|字段|组件类型|
|---|---|---|
|Step 1|昵称、账号名称|文本输入框|
|Step 2|账号类型|单选卡片网格（带图标）|
|Step 3|目标受众（年龄段、兴趣标签、痛点关键词）|下拉选择 + 标签输入|
|Step 4|风格调性|多选胶囊标签|
|Step 5|背景故事（可选）、内容偏好|文本域 + 多选标签|

**风格调性选项（预设）：** `幽默搞笑` `温暖治愈` `犬儒毒舌` `理性分析` `热血励志` `文艺清新` `接地气` `专业权威` `轻松日常` `情绪共鸣`

### 4.2 故事模板库

**模板数据结构（在 `story_templates.json` 中定义）：**

```typescript
interface StoryTemplate {
  id: string;
  name: string;           // 模板名称
  icon: string;           // Lucide icon name
  description: string;    // 一句话描述
  suitableFor: string[];  // 适合的账号类型
  exampleHook: string;    // 示例开场
  color: string;          // 卡片主题色（Tailwind class）
  promptTemplate: string; // 传给 AI 的 prompt 片段
}
```

**MVP 阶段必须包含的 8 个模板：**

1. **逆袭反转** — 从低谷到高光的反转叙事。适合：励志、成长类
2. **日常切片** — 生活场景的小故事。适合：Vlog、生活方式
3. **知识输出** — 干货分享结构。适合：知识博主、行业解读
4. **情感共鸣** — 热点话题的观点表达。适合：情感账号
5. **评测种草** — 产品体验 + 个人观点。适合：好物推荐
6. **对比拆解** — A vs B 对比分析。适合：科技、美妆
7. **挑战记录** — 挑战某件事的过程记录。适合：健身、学习
8. **幕后揭秘** — 展示不为人知的过程/真相。适合：各类型账号

**UI 规范：**

- 模板以 2 列卡片网格展示（移动端 1 列）
- 每张卡片包含：图标 + 名称 + 一句话描述 + 适用标签
- 卡片 hover 时有微弱上浮动画（`translateY(-4px)` + shadow 增强）
- 选中状态：边框高亮 + 勾选角标

### 4.3 叙事链条选择

**链条数据结构：**

```typescript
interface NarrativeChain {
  id: NarrativeType;
  name: string;
  description: string;
  suitableDuration: string;  // 适合的视频时长
  nodes: NarrativeNode[];    // 叙事节点序列
}

interface NarrativeNode {
  id: string;
  label: string;       // 节点名称（如"悬念开场"）
  description: string; // 节点功能说明
  durationHint: string; // 时长建议
}
```

**三种预设链条：**

```json
[
  {
    "id": "FOUR_ACT",
    "name": "四幕式",
    "description": "紧凑有力，适合 15-30 秒短视频",
    "suitableDuration": "15-30s",
    "nodes": [
      { "id": "hook", "label": "悬念开场", "description": "用一句话或画面抓住注意力", "durationHint": "3-5s" },
      { "id": "conflict", "label": "制造冲突", "description": "引出核心矛盾或问题", "durationHint": "5-8s" },
      { "id": "twist", "label": "反转/解答", "description": "出人意料的转折或干货揭晓", "durationHint": "5-10s" },
      { "id": "cta", "label": "强 CTA", "description": "引导点赞、关注、评论", "durationHint": "3-5s" }
    ]
  },
  {
    "id": "THREE_PART",
    "name": "三段式",
    "description": "经典结构，适合 30-60 秒视频",
    "suitableDuration": "30-60s",
    "nodes": [
      { "id": "intro", "label": "开场引入", "description": "建立场景，引出话题", "durationHint": "5-10s" },
      { "id": "body", "label": "核心内容", "description": "主体内容展开", "durationHint": "15-30s" },
      { "id": "ending", "label": "结尾召唤", "description": "总结升华 + 行动号召", "durationHint": "5-10s" }
    ]
  },
  {
    "id": "HOOK_CONTENT_CTA",
    "name": "Hook+内容+CTA",
    "description": "最通用的结构，适合任意时长",
    "suitableDuration": "15-60s",
    "nodes": [
      { "id": "hook", "label": "开屏抓人", "description": "前 3 秒决定用户是否继续看", "durationHint": "3s" },
      { "id": "content", "label": "主体展开", "description": "核心价值内容", "durationHint": "10-40s" },
      { "id": "cta", "label": "行动召唤", "description": "明确告诉观众下一步做什么", "durationHint": "3-5s" }
    ]
  }
]
```

**UI 规范：**

- 三种链条以横向卡片排列，移动端纵向堆叠
- 选中某个链条后，下方展示该链条的**节点流程图**（横向时间轴）
- 节点流程图使用圆角矩形节点 + 连线箭头，带动画渐入效果
- 每个节点可展开查看详细说明和时长建议

### 4.4 情节元素选择器

**可选情节元素（标签云形式）：**

```typescript
const PLOT_ELEMENTS = [
  { id: "suspense_open", label: "悬念开场", category: "opening" },
  { id: "question_hook", label: "提问引入", category: "opening" },
  { id: "scene_setting", label: "场景铺垫", category: "opening" },
  { id: "conflict", label: "制造冲突", category: "development" },
  { id: "emotional_peak", label: "情绪高潮", category: "development" },
  { id: "twist", label: "反转", category: "development" },
  { id: "data_proof", label: "数据佐证", category: "development" },
  { id: "personal_story", label: "个人经历", category: "development" },
  { id: "golden_quote", label: "金句", category: "highlight" },
  { id: "analogy", label: "类比说明", category: "highlight" },
  { id: "cta_follow", label: "引导关注", category: "ending" },
  { id: "cta_comment", label: "引导评论", category: "ending" },
  { id: "cta_share", label: "引导分享", category: "ending" },
  { id: "cliff_hanger", label: "留悬念（下集预告）", category: "ending" }
] as const;
```

**UI 规范：**

- 按 category 分组显示（开场类 / 发展类 / 亮点类 / 结尾类）
- 每个元素为可点选的胶囊标签，选中后高亮 + 勾选图标
- 最多可选 5 个元素，达到上限后其余置灰
- 此步骤为可选步骤，可直接跳过

### 4.5 AI 脚本生成引擎（核心）

#### 4.5.1 Prompt 分层拼接策略

`prompt_builder.py` 需要实现以下分层拼接逻辑：

```python
def build_prompt(persona: dict, template: dict, narrative: dict, elements: list[str]) -> list[dict]:
    """
    构建分层 Prompt，返回 messages 列表。
    
    层级：
    1. System Prompt — AI 角色设定 + 输出格式规范
    2. 人设注入 — 用户人设信息作为创作约束
    3. 模板约束 — 故事模板的结构要求
    4. 叙事链条 — 具体的叙事节点和节奏要求
    5. 情节元素 — 用户选择的情节点
    6. 输出格式 — 强制 JSON 结构化输出
    """
```

#### 4.5.2 System Prompt（固定部分）

```
你是一位专业的短视频编剧和内容策划师，专精于抖音/TikTok 平台的内容创作。你深谙短视频的叙事节奏、用户心理和平台算法偏好。

你的任务是根据创作者的人设信息和指定的叙事结构，生成一份可直接用于拍摄的短视频脚本。

## 输出格式要求

你必须严格按照以下 JSON 格式输出，不要输出任何 JSON 之外的内容：

{
  "title": "脚本标题（简洁有吸引力）",
  "totalDuration": 预估总时长（秒，整数）,
  "shots": [
    {
      "shotNumber": 镜头编号（从 1 开始）,
      "narration": "台词/旁白（创作者对着镜头说的话）",
      "visualDescription": "画面描述（镜头景别、构图、场景布置、表情动作）",
      "subtitle": "字幕文案（配合画面叠加的文字，可与台词不同）",
      "duration": 建议时长（秒，整数）,
      "bgmSuggestion": "BGM 风格/情绪建议",
      "notes": "拍摄提示（可选，如'此处需要停顿制造悬念'）"
    }
  ]
}

## 创作原则

1. 前 3 秒必须有强 Hook，直接抓住注意力
2. 台词要口语化，像真人在聊天，不要书面语
3. 画面描述要具体可执行，包含景别（特写/近景/中景/远景）和布景建议
4. 节奏紧凑，避免冗余，每个镜头都要有信息增量
5. 字幕文案要精炼，是台词的精华提炼，不是台词的复制
6. BGM 建议要描述情绪和风格，不要写具体歌曲名
7. 结尾必须有明确的 CTA（行动号召）
8. 所有内容必须贴合创作者的人设和风格调性
```

#### 4.5.3 人设注入模板

```
## 创作者人设

- 昵称：{nickname}
- 账号类型：{accountType}
- 风格调性：{styleTone}
- 目标受众：{targetAudience}
- 背景故事：{backgroundStory}
- 内容偏好：{contentPrefs}

请基于以上人设信息，确保生成的脚本在语言风格、内容深度、表达方式上与人设一致。
```

#### 4.5.4 模板约束注入

```
## 故事模板：{templateName}

{templatePromptTemplate}

请按照此模板的叙事特征来构建脚本内容。
```

#### 4.5.5 叙事链条注入

```
## 叙事结构：{narrativeName}

脚本必须严格按照以下叙事节点顺序展开：

{对每个 node 生成：}
### 节点 {index}：{node.label}
- 功能：{node.description}
- 建议时长：{node.durationHint}

请确保每个叙事节点都有对应的一个或多个镜头，节点之间的过渡自然流畅。
```

#### 4.5.6 情节元素注入

```
## 必须包含的情节元素

在脚本中必须自然融入以下情节元素：
{对每个 element 生成：}
- {element.label}

请将这些元素有机融入叙事结构中，不要生硬堆砌。
```

#### 4.5.7 流式输出实现

**FastAPI 端（`generate.py`）：**

```python
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import anthropic

router = APIRouter()

@router.post("/generate")
async def generate_script(request: GenerateRequest):
    prompt_messages = build_prompt(
        persona=request.persona,
        template=request.template,
        narrative=request.narrative,
        elements=request.elements
    )
    
    client = anthropic.Anthropic()
    
    async def stream_response():
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=prompt_messages,
        ) as stream:
            for text in stream.text_stream:
                yield f"data: {json.dumps({'text': text})}\n\n"
        yield "data: [DONE]\n\n"
    
    return StreamingResponse(
        stream_response(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
```

**前端 Hook（`useScriptGeneration.ts`）：**

```typescript
export function useScriptGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [parsedScript, setParsedScript] = useState<Script | null>(null);

  const generate = async (params: GenerateParams) => {
    setIsGenerating(true);
    setStreamedText("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter(line => line.startsWith("data: "));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === "[DONE]") {
          // 解析完整 JSON
          try {
            setParsedScript(JSON.parse(fullText));
          } catch (e) {
            console.error("JSON parse failed", e);
          }
          setIsGenerating(false);
          return;
        }
        const parsed = JSON.parse(data);
        fullText += parsed.text;
        setStreamedText(fullText);
      }
    }
  };

  return { generate, isGenerating, streamedText, parsedScript };
}
```

### 4.6 脚本展示与编辑

**脚本生成结果页面规范：**

1. **流式输出阶段**：显示打字机效果的原始文本，配合加载动画
2. **解析完成后**：自动切换为分镜头卡片视图

**ShotCard 组件规范：**

```typescript
interface ShotCardProps {
  shot: {
    shotNumber: number;
    narration: string;
    visualDescription: string;
    subtitle: string;
    duration: number;
    bgmSuggestion: string;
    notes?: string;
  };
  onEdit: (shotNumber: number, field: string, value: string) => void;
  onRegenerate: (shotNumber: number) => void; // 单镜头重新生成
}
```

**卡片布局（每个 ShotCard）：**

- 顶部：镜头编号标签 + 时长标签（如 `Shot 1 · 3-5s`）
- 主体区域：
    - 🎤 **台词/旁白**：最大字体，突出显示
    - 🎬 **画面描述**：灰色次要文字
    - 📝 **字幕文案**：斜体显示
    - 🎵 **BGM 建议**：小标签样式
    - 💡 **拍摄提示**（如有）：黄色提示框
- 底部：编辑按钮 + 重新生成此镜头按钮

**底部固定操作栏（ActionBar）：**

- 左侧：「重新生成整个脚本」按钮
- 右侧：「保存」「导出」「分享」三个按钮
- 移动端固定在底部，桌面端固定在内容区底部

### 4.7 脚本管理与导出

**脚本列表页规范：**

- 顶部搜索栏（支持模糊搜索标题和内容）
- 过滤器：按模板类型、按收藏状态、按时间范围
- 脚本卡片列表：标题 + 模板标签 + 创建时间 + 收藏按钮
- 支持批量操作（批量删除、批量导出）

**导出功能：**

- 卡片图片导出：将脚本渲染为多张卡片图片（每个镜头一张）
- PDF 导出：完整脚本导出为格式化 PDF
- 纯文本导出：复制到剪贴板

---

## 五、UI/UX 设计规范

### 5.1 设计原则

- **移动优先**：所有页面优先适配移动端（375px），然后适配桌面端
- **卡片式设计**：核心交互以卡片为载体，圆角 12px，带微弱阴影
- **动画克制**：只在关键交互处（步骤切换、生成完成、卡片出现）使用动画
- **信息层级清晰**：主操作醒目，次要信息收敛
- **中文排版优先**：字体使用 `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`

### 5.2 色彩系统

```css
:root {
  /* 主色 — 创意紫 */
  --primary-50: #F5F3FF;
  --primary-100: #EDE9FE;
  --primary-500: #8B5CF6;
  --primary-600: #7C3AED;
  --primary-700: #6D28D9;

  /* 功能色 */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;

  /* 中性色 */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-500: #6B7280;
  --gray-800: #1F2937;
  --gray-900: #111827;
}
```

### 5.3 关键页面交互动效

```typescript
// Framer Motion 预设动画（在 lib/animations.ts 中定义）

// 卡片入场
export const cardEnter = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// 步骤切换（向左滑出/向右滑入）
export const stepTransition = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.25 }
};

// 脚本生成完成时的庆祝效果
export const generateComplete = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 200, damping: 15 }
};
```

---

## 六、API 接口规范

### 6.1 接口列表

|方法|路径|说明|
|---|---|---|
|POST|`/api/auth/[...nextauth]`|认证相关|
|GET|`/api/persona`|获取当前用户人设|
|POST|`/api/persona`|创建/更新人设|
|POST|`/api/generate`|生成脚本（SSE 流式）|
|POST|`/api/generate/shot`|单镜头重新生成|
|GET|`/api/scripts`|获取脚本列表（分页）|
|GET|`/api/scripts/:id`|获取单个脚本详情|
|PUT|`/api/scripts/:id`|更新脚本|
|DELETE|`/api/scripts/:id`|删除脚本|
|POST|`/api/scripts/:id/favorite`|收藏/取消收藏|
|POST|`/api/scripts/:id/export`|导出脚本|

### 6.2 关键接口详情

**POST `/api/generate` — 脚本生成**

Request:

```json
{
  "templateId": "reversal",
  "narrativeType": "FOUR_ACT",
  "elements": ["suspense_open", "twist", "golden_quote", "cta_follow"],
  "customPrompt": "可选的额外指令"
}
```

Response: `text/event-stream`（SSE）

```
data: {"text": "{"}
data: {"text": "\"title\""}
data: {"text": ": \""}
...
data: [DONE]
```

---

## 七、商业逻辑约束

### 7.1 免费版限制

- 每日最多生成 3 条脚本（次日 0 点重置）
- 仅可使用前 4 个故事模板
- 仅支持三段式和 Hook+内容+CTA 两种叙事链条
- 无导出功能

### 7.2 计数逻辑

```typescript
// 在 API 中间件中检查
async function checkUsageLimit(userId: string): Promise<boolean> {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub || sub.plan === "FREE") {
    // 检查是否需要重置每日计数
    const now = new Date();
    if (now > sub.dailyResetAt) {
      await prisma.subscription.update({
        where: { userId },
        data: { dailyUsed: 0, dailyResetAt: getNextMidnight() }
      });
      return true;
    }
    return sub.dailyUsed < 3;
  }
  return true; // Pro/Team 不限
}
```

---

## 八、开发优先级（MVP 范围）

按以下顺序实现，每完成一个模块后进行自测：

### Phase 1：基础框架（第 1 步）

1. 初始化 Next.js 项目 + Tailwind + Framer Motion
2. 配置 Prisma + PostgreSQL 连接
3. 实现 NextAuth 基础认证（邮箱登录即可）
4. 搭建基础布局（Header + Sidebar + MobileNav）

### Phase 2：人设系统（第 2 步）

5. 实现人设建档 Wizard（5 步引导表单）
6. 实现人设 CRUD API
7. 人设编辑页面

### Phase 3：AI 脚本生成（第 3 步，核心）

8. 搭建 FastAPI 服务
9. 实现 `prompt_builder.py`（分层 Prompt 拼接）
10. 实现流式脚本生成 API
11. 前端故事模板选择页
12. 前端叙事链条选择页
13. 前端情节元素选择页
14. 前端脚本生成结果页（流式渲染 + 分镜头卡片）

### Phase 4：脚本管理（第 4 步）

15. 脚本保存 / 列表 / 搜索
16. 脚本编辑（单镜头微调）
17. 收藏功能
18. 导出功能（纯文本 + PDF）

### Phase 5：商业化（第 5 步）

19. 免费版用量限制
20. 付费界面（可后续接入支付）

---

## 九、质量检查清单

在每个 Phase 完成后，确认以下项：

- [ ] 移动端（375px）和桌面端（1440px）均可正常使用
- [ ] 所有页面加载时间 < 2 秒
- [ ] AI 生成的流式输出无中断、无乱码
- [ ] 所有表单有输入验证和错误提示
- [ ] 中文文本排版正确，无溢出和截断
- [ ] Framer Motion 动画流畅，无卡顿
- [ ] API 错误有友好的用户提示
- [ ] 数据库操作有适当的错误处理
- [ ] 环境变量均通过 `.env` 配置，无硬编码

---

## 十、环境变量清单

```bash
# .env.example

# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/scriptai"

# Redis
REDIS_URL="redis://localhost:6379"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Claude API
ANTHROPIC_API_KEY="sk-ant-xxx"

# FastAPI 服务地址
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

---

> **致 AI Agent：** 请严格按照本文档的技术栈、目录结构、数据模型和交互规范进行开发。如果某些细节未在本文档中明确，请遵循 Next.js + Tailwind 社区的最佳实践。任何架构层面的偏离，请先说明原因再执行。