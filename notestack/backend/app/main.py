from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import notes
from .database import engine, Base

# Automatically create database tables for SQLite
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NoteStack API", version="1.0.0")

# Setup CORS middleware
# In dev mode, we allow all origins or specifically http://localhost:5173. Using "*" is safe for a local dev project.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register notes router
app.include_router(notes.router)

# Health endpoint
@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}
