import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Resolve and load .env file from the backend folder or the root folder
backend_dir = Path(__file__).resolve().parent.parent
root_dir = backend_dir.parent
env_paths = [root_dir / ".env", backend_dir / ".env", Path.cwd() / ".env"]

env_loaded = False
for path in env_paths:
    if path.exists():
        load_dotenv(dotenv_path=path)
        env_loaded = True
        break

if not env_loaded:
    load_dotenv()

# Use SQLite database
DATABASE_URL = "sqlite:///./notestack.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
