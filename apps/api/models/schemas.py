from pydantic import BaseModel
from typing import Optional


class TargetAudience(BaseModel):
    ageRange: str = "25-34岁"
    interests: list[str] = []
    painPoints: list[str] = []


class ContentPrefs(BaseModel):
    videoTypes: list[str] = []
    themes: list[str] = []


class PersonaData(BaseModel):
    nickname: str = ""
    accountType: str = "OTHER"
    styleTone: list[str] = []
    targetAudience: TargetAudience = TargetAudience()
    backgroundStory: Optional[str] = None
    contentPrefs: Optional[ContentPrefs] = None


class GenerateRequest(BaseModel):
    templateId: str
    narrativeType: str
    elements: list[str] = []
    customPrompt: Optional[str] = None
    userId: Optional[str] = None
    persona: Optional[PersonaData] = None
