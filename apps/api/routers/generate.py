import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from models.schemas import GenerateRequest
from services.script_engine import ScriptEngine

router = APIRouter()
engine = ScriptEngine()


@router.post("/generate")
async def generate_script(request: GenerateRequest):
    try:
        return StreamingResponse(
            engine.generate_stream(request),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate/shot")
async def regenerate_shot(request: GenerateRequest):
    """Regenerate a single shot"""
    try:
        return StreamingResponse(
            engine.generate_stream(request),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
