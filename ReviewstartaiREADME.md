# ReviewStar AI 🌟
### Advanced AI-Powered Reputation Intelligence & Review Engine

ReviewStar AI is a sophisticated, full-stack ecosystem designed to intercept, analyze, and manage customer sentiment in real-time. Built for multi-business scalability, it combines Google Gemini 2.0's intelligence with powerful data visualization and live monitoring tools.

---

## 🚀 Vision & Key Features

ReviewStar AI goes beyond simple review management by providing "Deep Intel" into every customer signal.

### 1. **AI Response Engine (Gemini 2.0 Core)**
*   **Draft Intelligence**: Automatically generates professional, context-aware responses to customer reviews.
*   **Nuanced Analysis**: Analyzes sentiment, emotional vibe, and specific aspects (Price, Service, Quality).

### 2. **Live Feedback Pulse**
*   **WebSocket Terminal**: A real-time notification stream in the admin dashboard that intercepts new signals as they happen.
*   **Urgency Alerts**: Critical feedback (ratings ≤ 2) triggers immediate red alerts in the "Priority Signals" stream.

### 3. **Deep Intel Report Export**
*   **Dynamic CSV Generation**: Export comprehensive intelligence reports.
*   **Context-Aware**: Filter exports by specific business entities or download the global intelligence log.

### 4. **Smart AI Search**
*   **Semantic Interception**: Search through reviews using standard keywords or activate **Smart Mode** to find deep patterns across AI-generated summaries and hidden sentiments.

### 5. **Multi-Business Scaling**
*   **Entity Switching**: Manage multiple establishments (e.g., "Starbucks", "Local Dhaba") from a single "Intel Center" with dedicated analytics for each.

### 6. **Public Submission Portal**
*   **Unified Rating Engine**: A custom consumer portal where users can log feedback for any business.
*   **Live Signal Board**: Publicly visible establishment stats with real-time review logs accessible to users.

---

## 🛠 Tech Stack

*   **Backend**: Python FastAPI, SQLAlchemy, PostgreSQL.
*   **AI Service**: Google Gemini 2.0 (Generative AI).
*   **Frontend**: React 19 (Vite), Tailwind CSS, Framer Motion (Animations), Recharts (Analytics).
*   **Real-time**: WebSockets for Live Pulse monitoring.
*   **Data Processing**: Pandas for heavy-duty CSV intelligence reports.

---

## 📦 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js & npm
- PostgreSQL database

### 1. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```
Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY=your_google_ai_key
DATABASE_URL=postgresql://user:password@localhost:5432/ReviewStar_db
SECRET_KEY=your_jwt_secret
```
Run the server:
```bash
uvicorn app.main:app --reload
```

### 2. Admin & User Frontend Setup
Repeat for both `admin-frontend/` and `user-frontend/`:
```bash
npm install
npm run dev
```

---

## 🛡 Security Note
Sensitive credentials like `.env` and `venv` directories are explicitly excluded in `.gitignore`. Ensure you provide your own environment variables before deployment.

---

## 📜 License
Developed with ❤️ by **Karan**. 
*Designed for Advanced Agentic Coding & Business Intelligence.*
