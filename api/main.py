from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, db
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase
# Note: You need to set FIREBASE_CONFIG_PATH or put serviceAccountKey.json in the same directory
try:
    cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH", "serviceAccountKey.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred, {
            'databaseURL': os.getenv("FIREBASE_DATABASE_URL")
        })
    else:
        print(f"Warning: Firebase credentials not found at {cred_path}")
except Exception as e:
    print(f"Error initializing Firebase: {e}")

@app.get("/")
async def root():
    return {"message": "HomeFix Pro API is running"}

@app.get("/api/stats")
async def get_stats():
    # Example: Fetch stats from Firebase Realtime Database
    try:
        ref = db.reference('stats')
        stats = ref.get()
        if not stats:
            return {
                "total_products": 0,
                "total_sales": 0,
                "total_profit": 0
            }
        return stats
    except Exception as e:
        return {"error": str(e)}

from pydantic import BaseModel
import resend

class EmailRequest(BaseModel):
    to_email: str
    subject: str
    type: str # 'JOB_PENDING', 'JOB_DONE', 'NEW_MESSAGE'
    data: dict

@app.post("/api/send-email")
async def send_email(req: EmailRequest):
    resend.api_key = os.getenv("RESEND_API_KEY")
    
    html_content = ""
    if req.type == 'JOB_PENDING':
        html_content = f"<h1>Job Request Pending</h1><p>Your request for <b>{req.data.get('title')}</b> is currently pending approval.</p>"
    elif req.type == 'JOB_DONE':
        html_content = f"<h1>Job Completed!</h1><p>Good news! Your service for <b>{req.data.get('title')}</b> has been marked as completed.</p>"
    elif req.type == 'NEW_MESSAGE':
        html_content = f"<h1>New Message Alert</h1><p>You have a new message regarding your <b>{req.data.get('title')}</b> project.</p>"

    try:
        params = {
            "from": "HomeFix Pro <onboarding@resend.dev>",
            "to": [req.to_email],
            "subject": req.subject,
            "html": html_content
        }
        res = resend.Emails.send(params)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/orders")
async def get_orders():
    try:
        ref = db.reference('orders')
        orders = ref.get()
        return orders if orders else []
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
