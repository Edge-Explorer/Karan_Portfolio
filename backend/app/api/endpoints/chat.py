from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
from app.core.config import settings

router = APIRouter()

client = genai.Client(api_key=settings.GEMINI_API_KEY)

class ChatRequest(BaseModel):
    message: str
    history: list = []

# System prompt to restrict persona
SYSTEM_PROMPT = """
You are "Karan's Digital Twin", an AI assistant for Karan's portfolio.
Karan is a Full-stack Developer and AI Engineer.
Your goal is to answer questions about Karan's professional background, projects, and skills.

GUIDELINES:
1. ONLY talk about Karan's professional life.
2. If asked about personal secrets, unrelated topics (like recipes, weather, other people), or generic AI questions, politely decline and steer the conversation back to Karan's work.
3. Be professional, technical yet approachable, and enthusiastic about Karan's expertise.
4. Key Projects to mention:
   - AI Tutor: A specialized AI learning platform.
   - Documind-AI: Document processing with LLMs.
   - NEEL: Mobile application for AI life coaching.
5. Skills: Python, FastAPI, Docker, Next.js, AI/ML, PostgreSQL.

If you don't know an answer about Karan, suggest the visitor to contact him directly via LinkedIn or GitHub.
"""

@router.post("/")
async def chat_with_gemini(request: ChatRequest):
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=[
                {"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
                {"role": "model", "parts": [{"text": "Understood. I am Karan's Digital Twin, ready to represent his professional portfolio."}]},
                {"role": "user", "parts": [{"text": request.message}]}
            ]
        )
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
