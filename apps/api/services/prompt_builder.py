import json
from typing import Optional

# Story templates data
STORY_TEMPLATES = {
    "reversal": {
        "name": "逆袭反转",
        "promptTemplate": "请创作一个【逆袭反转】类型的短视频脚本。叙事要从低谷/困境开始，逐步展现努力过程，最终呈现反转高光时刻。关键是要让观众产生意想不到的惊喜感。",
    },
    "daily_slice": {
        "name": "日常切片",
        "promptTemplate": "请创作一个【日常切片】类型的短视频脚本。从一个真实的生活场景切入，捕捉日常中的小美好、小感悟或小趣事，让观众产生共鸣和代入感。",
    },
    "knowledge": {
        "name": "知识输出",
        "promptTemplate": "请创作一个【知识输出】类型的短视频脚本。以一个引人好奇的知识点切入，用通俗易懂的方式讲解干货，让观众觉得学到了。结构要清晰，信息密度适中。",
    },
    "emotional": {
        "name": "情感共鸣",
        "promptTemplate": "请创作一个【情感共鸣】类型的短视频脚本。围绕一个能引起广泛共鸣的情感话题，表达真实、有温度的观点，让观众觉得说的就是我。",
    },
    "review": {
        "name": "评测种草",
        "promptTemplate": "请创作一个【评测种草】类型的短视频脚本。从真实使用体验出发，客观展示产品优缺点，给出个人推荐意见，让观众做出购买决策。",
    },
    "comparison": {
        "name": "对比拆解",
        "promptTemplate": "请创作一个【对比拆解】类型的短视频脚本。选取两个相似的事物/产品进行全方位对比，通过数据和体验说明差异，帮助观众做出选择。",
    },
    "challenge": {
        "name": "挑战记录",
        "promptTemplate": "请创作一个【挑战记录】类型的短视频脚本。设定一个具体的挑战目标，记录过程中的困难和突破，展现坚持的意义和最终的成果。",
    },
    "behind_scenes": {
        "name": "幕后揭秘",
        "promptTemplate": "请创作一个【幕后揭秘】类型的短视频脚本。展示某个事物/行业/现象背后不为人知的过程或真相，满足观众的好奇心，让人觉得涨知识了。",
    },
}

NARRATIVE_CHAINS = {
    "FOUR_ACT": {
        "name": "四幕式",
        "nodes": [
            {"label": "悬念开场", "description": "用一句话或画面抓住注意力", "durationHint": "3-5s"},
            {"label": "制造冲突", "description": "引出核心矛盾或问题", "durationHint": "5-8s"},
            {"label": "反转/解答", "description": "出人意料的转折或干货揭晓", "durationHint": "5-10s"},
            {"label": "强 CTA", "description": "引导点赞、关注、评论", "durationHint": "3-5s"},
        ],
    },
    "THREE_PART": {
        "name": "三段式",
        "nodes": [
            {"label": "开场引入", "description": "建立场景，引出话题", "durationHint": "5-10s"},
            {"label": "核心内容", "description": "主体内容展开", "durationHint": "15-30s"},
            {"label": "结尾召唤", "description": "总结升华 + 行动号召", "durationHint": "5-10s"},
        ],
    },
    "HOOK_CONTENT_CTA": {
        "name": "Hook+内容+CTA",
        "nodes": [
            {"label": "开屏抓人", "description": "前 3 秒决定用户是否继续看", "durationHint": "3s"},
            {"label": "主体展开", "description": "核心价值内容", "durationHint": "10-40s"},
            {"label": "行动召唤", "description": "明确告诉观众下一步做什么", "durationHint": "3-5s"},
        ],
    },
}

PLOT_ELEMENTS = {
    "suspense_open": "悬念开场",
    "question_hook": "提问引入",
    "scene_setting": "场景铺垫",
    "conflict": "制造冲突",
    "emotional_peak": "情绪高潮",
    "twist": "反转",
    "data_proof": "数据佐证",
    "personal_story": "个人经历",
    "golden_quote": "金句",
    "analogy": "类比说明",
    "cta_follow": "引导关注",
    "cta_comment": "引导评论",
    "cta_share": "引导分享",
    "cliff_hanger": "留悬念（下集预告）",
}

ACCOUNT_TYPE_LABELS = {
    "KNOWLEDGE": "知识博主",
    "VLOG": "生活 Vlog",
    "EMOTION": "情感类",
    "COMEDY": "搞笑",
    "REVIEW": "评测种草",
    "TECH": "科技",
    "BEAUTY": "美妆",
    "FITNESS": "健身",
    "FOOD": "美食",
    "OTHER": "其他",
}

SYSTEM_PROMPT = """你是一位专业的短视频编剧和内容策划师，专精于抖音/TikTok 平台的内容创作。你深谙短视频的叙事节奏、用户心理和平台算法偏好。

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
8. 所有内容必须贴合创作者的人设和风格调性"""


def build_prompt(
    persona: Optional[dict],
    template_id: str,
    narrative_type: str,
    elements: list[str],
    custom_prompt: Optional[str] = None,
) -> list[dict]:
    """
    构建分层 Prompt，返回 messages 列表。
    """
    messages = []

    # 1. System prompt
    system_content = SYSTEM_PROMPT

    # 2. 人设注入
    if persona:
        account_type_label = ACCOUNT_TYPE_LABELS.get(persona.get("accountType", ""), "其他")
        style_tone = "、".join(persona.get("styleTone", [])) or "未设定"

        target = persona.get("targetAudience", {})
        audience_str = f"年龄段: {target.get('ageRange', '未设定')}"
        if target.get("interests"):
            audience_str += f"，兴趣: {'、'.join(target['interests'])}"
        if target.get("painPoints"):
            audience_str += f"，痛点: {'、'.join(target['painPoints'])}"

        persona_section = f"""

## 创作者人设

- 昵称：{persona.get('nickname', '未设定')}
- 账号类型：{account_type_label}
- 风格调性：{style_tone}
- 目标受众：{audience_str}"""

        if persona.get("backgroundStory"):
            persona_section += f"\n- 背景故事：{persona['backgroundStory']}"

        prefs = persona.get("contentPrefs")
        if prefs:
            if prefs.get("videoTypes"):
                persona_section += f"\n- 视频类型偏好：{'、'.join(prefs['videoTypes'])}"
            if prefs.get("themes"):
                persona_section += f"\n- 内容主题偏好：{'、'.join(prefs['themes'])}"

        persona_section += "\n\n请基于以上人设信息，确保生成的脚本在语言风格、内容深度、表达方式上与人设一致。"
        system_content += persona_section

    # 3. 模板约束
    template = STORY_TEMPLATES.get(template_id, {})
    if template:
        system_content += f"""

## 故事模板：{template.get('name', template_id)}

{template.get('promptTemplate', '')}

请按照此模板的叙事特征来构建脚本内容。"""

    # 4. 叙事链条
    narrative = NARRATIVE_CHAINS.get(narrative_type, {})
    if narrative:
        nodes_text = ""
        for i, node in enumerate(narrative.get("nodes", []), 1):
            nodes_text += f"""
### 节点 {i}：{node['label']}
- 功能：{node['description']}
- 建议时长：{node['durationHint']}
"""
        system_content += f"""

## 叙事结构：{narrative.get('name', narrative_type)}

脚本必须严格按照以下叙事节点顺序展开：
{nodes_text}
请确保每个叙事节点都有对应的一个或多个镜头，节点之间的过渡自然流畅。"""

    # 5. 情节元素
    if elements:
        elements_text = "\n".join(
            f"- {PLOT_ELEMENTS.get(e, e)}" for e in elements
        )
        system_content += f"""

## 必须包含的情节元素

在脚本中必须自然融入以下情节元素：
{elements_text}

请将这些元素有机融入叙事结构中，不要生硬堆砌。"""

    messages.append({"role": "system", "content": system_content})

    # User message
    user_msg = "请根据以上要求，生成一份完整的短视频拍摄脚本。只输出 JSON，不要输出其他内容。"
    if custom_prompt:
        user_msg = f"{custom_prompt}\n\n{user_msg}"

    messages.append({"role": "user", "content": user_msg})

    return messages
