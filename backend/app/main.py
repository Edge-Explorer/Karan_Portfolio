from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import chat, contact
from app.core.config import settings
from app.database import engine, Base
from app import models  # Ensure models are loaded

import threading

def create_db_tables():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables validated/created successfully.")
    except Exception as e:
        print(f"Database sync error (non-fatal for startup): {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run DB creation in background thread so it doesn't block startup
    thread = threading.Thread(target=create_db_tables)
    thread.start()
    yield

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

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