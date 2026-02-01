from fastapi import FastAPI, Request
import time
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
    # Run DB creation in background thread
    print("🚀 Neural Gateway: Initializing Database...")
    thread = threading.Thread(target=create_db_tables)
    thread.daemon = True
    thread.start()
    yield

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# Logging Middleware: See every request in Render logs instantly
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"DEBUG: Incoming {request.method} request to {request.url.path}")
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    print(f"DEBUG: Completed {request.method} {request.url.path} in {duration:.2f}s")
    return response

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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