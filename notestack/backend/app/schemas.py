from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class NoteBase(BaseModel):
    title: str = Field(..., max_length=200, min_length=1, description="Title of the note")
    body: str | None = Field(default=None, description="Body content of the note")

class NoteCreate(NoteBase):
    pass

class NoteResponse(NoteBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
