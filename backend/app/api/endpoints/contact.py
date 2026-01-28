from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models import ContactMessage

router = APIRouter()

class ContactCreate(BaseModel):
    name: str = "Visitor"
    email: str
    subject: str
    message: str

@router.post("/")
async def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    try:
        db_contact = ContactMessage(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message
        )
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        return {"status": "success", "message": "Inquiry recorded in database"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
