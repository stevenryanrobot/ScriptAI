import json
import os
import anthropic
from models.schemas import GenerateRequest
from services.prompt_builder import build_prompt


class ScriptEngine:
    def __init__(self):
        self.client = anthropic.Anthropic(
            api_key=os.getenv("ANTHROPIC_API_KEY", "")
        )
        self.model = "claude-sonnet-4-20250514"

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

        system_msg = ""
        user_messages = []
        for msg in messages:
            if msg["role"] == "system":
                system_msg = msg["content"]
            else:
                user_messages.append(msg)

        try:
            with self.client.messages.stream(
                model=self.model,
                max_tokens=4096,
                system=system_msg,
                messages=user_messages,
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'text': text}, ensure_ascii=False)}\n\n"

            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)}, ensure_ascii=False)}\n\n"
            yield "data: [DONE]\n\n"
