import json
import os
from openai import OpenAI
from models.schemas import GenerateRequest
from services.prompt_builder import build_prompt


class ScriptEngine:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("ARK_API_KEY", ""),
            base_url="https://ark.cn-beijing.volces.com/api/v3",
        )
        self.model = os.getenv("ARK_MODEL", "doubao-seed-2-0-mini-260215")

    async def generate_stream(self, request: GenerateRequest):
        """Generate script with streaming SSE output."""
        persona_dict = None
        if request.persona:
            persona_dict = request.persona.model_dump()

        messages = build_prompt(
            persona=persona_dict,
            template_id=request.templateId,
            narrative_type=request.narrativeType,
            elements=request.elements,
            custom_prompt=request.customPrompt,
        )

        try:
            stream = self.client.chat.completions.create(
                model=self.model,
                max_tokens=4096,
                messages=messages,
                stream=True,
            )

            for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    text = chunk.choices[0].delta.content
                    yield f"data: {json.dumps({'text': text}, ensure_ascii=False)}\n\n"

            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)}, ensure_ascii=False)}\n\n"
            yield "data: [DONE]\n\n"
