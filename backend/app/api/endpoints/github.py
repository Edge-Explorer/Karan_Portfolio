from fastapi import APIRouter, HTTPException
from app.services.github import fetch_github_stats

router = APIRouter()

@router.get("/stats")
async def get_github_stats(username: str = "Edge-Explorer"):
    try:
        stats = fetch_github_stats(username)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
