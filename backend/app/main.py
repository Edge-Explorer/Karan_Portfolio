from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import chat, contact
from app.core.config import settings
from app.database import engine, Base
from app import models  # Ensure models are loaded

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Karan's Portfolio API"}

# Include routers
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
