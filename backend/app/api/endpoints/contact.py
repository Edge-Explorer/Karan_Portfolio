import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models import ContactMessage
from app.core.config import settings

router = APIRouter()

class ContactCreate(BaseModel):
    name: str = "Visitor"
    email: str
    subject: str
    message: str

def send_email_notification(contact: ContactCreate):
    """Auxiliary function to send email notification using SMTP"""
    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        print("Email credentials not configured. Skipping email send.")
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = settings.SMTP_USERNAME
        msg['To'] = settings.CONTACT_EMAIL
        msg['Subject'] = f"Portfolio Alert: {contact.subject}"

        body = f"""
        New Contact Inquiry Received:
        
        Name: {contact.name}
        Email: {contact.email}
        Subject: {contact.subject}
        Message:
        {contact.message}
        
        ---
        Sent from your Portfolio API
        """
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"SMTP Error: {e}")
        return False

@router.post("/")
async def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    try:
        # 1. Save to Database
        db_contact = ContactMessage(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message
        )
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)

        # 2. Trigger Email Notification (Non-blocking or simple call)
        email_sent = send_email_notification(contact)

        return {
            "status": "success", 
            "message": "Inquiry recorded in database",
            "email_dispatched": email_sent
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
