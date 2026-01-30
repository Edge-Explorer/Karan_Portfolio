<div align="center">

# 🧠 NEEL
### Neural Evolution & Executive Logic

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74+-61dafb.svg)](https://reactnative.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)](https://www.postgresql.org/)
[![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000020.svg)](https://expo.dev/)

**An intelligent life coach & productivity strategist powered by multi-agent AI architecture**

[Download App](https://drive.google.com/file/d/19xgBoib7a0IM-4vt2OWgHXDF9khs-5vn/view?usp=drive_link) • [Live API](https://neel-8ybz.onrender.com/docs) • [Report Bug](https://github.com/Edge-Explorer/NEEL/issues) • [Request Feature](https://github.com/Edge-Explorer/NEEL/issues)

<img src="mobile/assets/images/icon.png" alt="NEEL Logo" width="200"/>

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Mobile Application](#-mobile-application)
- [Multi-Agent System](#-multi-agent-system)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Development](#-development)
- [Design Principles](#-design-principles)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**NEEL** transcends traditional productivity tracking by functioning as a sophisticated AI life coach that monitors work patterns, calibrates strategy, and delivers high-level insights through a premium glassmorphic interface.

Designed for **high-performers** — Engineers, Researchers, Creators — NEEL serves as a cognitive partner to optimize deep-work patterns and long-term trajectory through intelligent behavioral analysis and personalized coaching.

### What Makes NEEL Different?

- 🧠 **Multi-Agent Intelligence**: Supervisor, Reasoning, and Reflection agents work in harmony
- 💾 **Persistent Memory**: Contextual awareness across all conversations
- 🪄 **Magic Auto-Logging**: Natural language activity parsing
- 📊 **Behavioral Analytics**: Deep insights into productivity patterns
- 🎨 **Premium UX**: Glassmorphic design with dynamic gradients
- ☁️ **Cloud-Native**: Production-ready deployment on Render + PostgreSQL

---

## ✨ Key Features

### 📊 NEEL Pulse Dashboard
A real-time command center displaying your **Calibration Status** with dynamic activity breakdowns revealing exactly where cognitive energy is being spent.

### 🧠 Permanent Conversational Memory
NEEL remembers your evolution. Chat history persists in the cloud, enabling the AI to reference past goals and wins for context-aware coaching.

### 🪄 Magic Auto-Logging
Log work without forms. Simply tell NEEL what you accomplished, and AI automatically parses, categorizes, and logs the activity.

### 📈 Intelligent Insights
Multi-agent reasoning system identifies behavioral patterns, suggests optimizations, and provides strategic guidance based on your historical data.

### 🎯 Goal Tracking & Calibration
Track progress toward goals with intelligent calibration that adapts recommendations based on your evolving productivity patterns.

### 🔒 Privacy-First Architecture
All data encrypted in transit and at rest. User data isolation with secure authentication.

---

## 🏗️ Architecture

NEEL implements a **backend-first, multi-agent AI architecture** with cloud-native deployment:

```
┌─────────────────────────────────────────────────────────┐
│                    Mobile Client (React Native)          │
│                  Glassmorphic UI • Expo SDK 54          │
└────────────────────┬────────────────────────────────────┘
                     │ REST API
                     ▼
┌─────────────────────────────────────────────────────────┐
│              FastAPI Backend (Python 3.11+)             │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Multi-Agent Orchestration Layer         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │   │
│  │  │Supervisor│  │ Reasoning│  │  Reflection  │  │   │
│  │  │  Agent   │──│  Agent   │──│    Agent     │  │   │
│  │  └──────────┘  └──────────┘  └──────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│              ┌──────────┴──────────┐                    │
│              ▼                     ▼                    │
│     ┌─────────────────┐   ┌──────────────┐             │
│     │  LangChain Core │   │  Gemini 1.5  │             │
│     │   Orchestration │   │    Flash     │             │
│     └─────────────────┘   └──────────────┘             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          PostgreSQL Database (Render Managed)           │
│     Users • Activities • Chats • Analytics              │
└─────────────────────────────────────────────────────────┘
```

### Agent Responsibilities

| Agent | Role | Responsibility |
|-------|------|----------------|
| **Supervisor** | Gatekeeper | Validates data sufficiency before reasoning |
| **Reasoning** | Brain | Identifies trends, generates insights & guidance |
| **Reflection** | Auditor | Ensures safety, tone quality, and appropriateness |

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.104+
- **AI/ML**: LangChain + Google Gemini 1.5 Flash
- **Database**: PostgreSQL 15+ (Alembic migrations)
- **ORM**: SQLAlchemy 2.0+
- **Deployment**: Render (Cloud Platform)
- **Authentication**: JWT-based secure auth
- **API Docs**: Auto-generated OpenAPI (Swagger)

### Mobile
- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript + JavaScript
- **UI Libraries**: Lucide React Native Icons
- **Build**: EAS Build (Production APK)
- **State Management**: React Hooks + Context
- **Styling**: Glassmorphic design system

### DevOps & Tools
- **Version Control**: Git + GitHub
- **Migrations**: Alembic
- **Process Manager**: Uvicorn + Gunicorn
- **Testing**: Advanced diagnostic scripts
- **Notebooks**: Jupyter for AI experimentation

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Google Gemini API Key
- Expo CLI (for mobile development)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Edge-Explorer/NEEL.git
cd NEEL
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env and add your credentials:
# - DATABASE_URL
# - GOOGLE_GEMINI_API_KEY
# - SECRET_KEY
```

5. **Run database migrations**
```bash
alembic upgrade head
```

6. **Seed initial data (optional)**
```bash
python seed_data.py
```

7. **Start the development server**
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

API will be available at: `http://localhost:8000/docs`

### Mobile Setup

1. **Navigate to mobile directory**
```bash
cd mobile
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API endpoint**
```javascript
// mobile/services/api.js
const API_BASE_URL = 'http://YOUR_LOCAL_IP:8000';  // For local dev
// OR
const API_BASE_URL = 'https://neel-8ybz.onrender.com';  // For production
```

4. **Start Expo development server**
```bash
npx expo start
```

5. **Run on device**
- Scan QR code with Expo Go app (Android/iOS)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

### Production Build (Android)

```bash
cd mobile
eas build --platform android --profile production
```

---

## 📁 Project Structure

```
NEEL/
├── backend/                  # FastAPI backend application
│   ├── main.py              # Application entry point
│   ├── models/              # SQLAlchemy database models
│   ├── routers/             # API route handlers
│   ├── services/            # Business logic layer
│   ├── agents/              # Multi-agent AI system
│   └── utils/               # Utility functions
│
├── mobile/                   # React Native mobile app
│   ├── App.js               # Mobile app entry point
│   ├── components/          # Reusable UI components
│   ├── screens/             # Application screens
│   ├── services/            # API integration layer
│   ├── assets/              # Images, fonts, icons
│   └── app.json             # Expo configuration
│
├── alembic/                  # Database migration scripts
│   ├── versions/            # Migration version files
│   └── env.py              # Alembic environment config
│
├── notebooks/                # Jupyter notebooks for AI experiments
├── scripts/                  # Utility scripts
├── models/                   # Serialized AI models
├── data/                     # Data files and datasets
├── ai_design/                # AI-generated design assets
│
├── requirements.txt          # Python dependencies
├── alembic.ini              # Alembic configuration
├── render.yaml              # Render deployment config
├── Procfile                 # Process configuration
├── start.sh                 # Startup script
└── README.md                # This file
```

---

## 📚 API Documentation

### Base URL
- **Production**: `https://neel-8ybz.onrender.com`
- **Local**: `http://localhost:8000`

### Interactive Documentation
- **Swagger UI**: `/docs`
- **ReDoc**: `/redoc`

### Core Endpoints

#### Authentication
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

#### User Management
```http
GET    /api/users/me
PUT    /api/users/me
DELETE /api/users/me
```

#### Activity Logging
```http
POST   /api/activities/         # Create activity
GET    /api/activities/         # List activities
GET    /api/activities/{id}     # Get activity detail
PUT    /api/activities/{id}     # Update activity (24hr window)
DELETE /api/activities/{id}     # Delete activity
```

#### AI Chat
```http
POST   /api/chat/message        # Send message to AI
GET    /api/chat/history        # Retrieve chat history
DELETE /api/chat/clear          # Clear chat history
```

#### Analytics
```http
GET    /api/analytics/dashboard     # Dashboard metrics
GET    /api/analytics/trends        # Productivity trends
GET    /api/analytics/calibration   # Calibration status
```

### Magic Auto-Logging Example

```bash
curl -X POST "https://neel-8ybz.onrender.com/api/activities/auto-log" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Spent 3 hours implementing the authentication system and writing unit tests"
  }'
```

**Response:**
```json
{
  "id": "uuid-here",
  "category": "Development",
  "duration": 180,
  "parsed_description": "Implemented authentication system and wrote unit tests",
  "timestamp": "2024-01-22T10:30:00Z"
}
```

---

## 📱 Mobile Application

### Design System

NEEL's mobile interface follows a **glassmorphic design system** with:

- 🌑 Dark mode by default
- 🔮 Glass-like translucent components
- 🎨 Dynamic linear gradients
- ✨ Smooth animations and transitions
- 📐 Consistent spacing and typography

### Key Screens

1. **Dashboard** - Real-time productivity pulse
2. **Activity Logger** - Manual and auto-logging
3. **Chat Interface** - AI coaching conversations
4. **Analytics** - Visual insights and trends
5. **Profile** - User settings and preferences

### Build Configuration

```json
{
  "expo": {
    "name": "NEEL",
    "slug": "neel",
    "version": "1.0.0",
    "sdkVersion": "54.0.0",
    "platforms": ["ios", "android"],
    "android": {
      "package": "com.karan.neel",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png"
      }
    }
  }
}
```

---

## 🤖 Multi-Agent System

### Agent Architecture

NEEL's intelligence is powered by a three-tier agent system:

```python
# Simplified Agent Flow

class SupervisorAgent:
    """Gates reasoning based on data sufficiency"""
    def evaluate(self, user_data):
        if len(user_data.activities) < MIN_THRESHOLD:
            return "insufficient_data"
        return "proceed_to_reasoning"

class ReasoningAgent:
    """Core intelligence for trend analysis"""
    def analyze(self, user_data):
        patterns = self.identify_patterns(user_data)
        insights = self.generate_insights(patterns)
        recommendations = self.create_recommendations(insights)
        return recommendations

class ReflectionAgent:
    """Quality assurance and safety auditor"""
    def audit(self, ai_response):
        safety_check = self.verify_safety(ai_response)
        tone_check = self.verify_tone(ai_response)
        if not (safety_check and tone_check):
            return self.modify_response(ai_response)
        return ai_response
```

### Agent Orchestration

The agents communicate through **LangChain's graph-based execution**:

1. User message → **Supervisor Agent** (data validation)
2. If approved → **Reasoning Agent** (insight generation)
3. Output → **Reflection Agent** (quality audit)
4. Final response → User

---

## 🗄️ Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    duration INTEGER,  -- minutes
    logged_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    can_edit_until TIMESTAMP  -- 24-hour edit window
);

-- Chat history
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,  -- 'user' or 'assistant'
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics snapshots
CREATE TABLE analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    calibration_status VARCHAR(50),
    total_activities INTEGER,
    most_productive_category VARCHAR(100),
    snapshot_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Migration Management

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

---

## 🚀 Deployment

### Render Deployment

NEEL is deployed on **Render** with the following configuration:

**render.yaml**
```yaml
services:
  - type: web
    name: neel-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: ./start_render.sh
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: DATABASE_URL
        fromDatabase:
          name: neel-db
          property: connectionString
      - key: GOOGLE_GEMINI_API_KEY
        sync: false

databases:
  - name: neel-db
    databaseName: neel_production
    user: neel_user
    plan: starter
```

### Environment Variables

Required environment variables for production:

```bash
DATABASE_URL=postgresql://user:pass@host:5432/dbname
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_secret_key_for_jwt
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Deployment Steps

1. **Connect GitHub repository to Render**
2. **Configure environment variables**
3. **Deploy backend service**
4. **Run migrations** (auto-run via start script)
5. **Verify deployment** at `/docs` endpoint

### Health Check

```bash
curl https://neel-8ybz.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "ai_service": "operational"
}
```

---

## 👨‍💻 Development

### Development Workflow

1. **Create feature branch**
```bash
git checkout -b feature/amazing-feature
```

2. **Make changes and test**
```bash
# Backend tests
python -m pytest tests/

# Frontend lint
cd mobile && npm run lint
```

3. **Commit with conventional commits**
```bash
git commit -m "feat: add amazing feature"
```

4. **Push and create PR**
```bash
git push origin feature/amazing-feature
```

### Code Quality

NEEL maintains high code quality through:

- **Type hints** in Python (mypy)
- **Linting**: flake8, black, isort
- **Testing**: pytest with >80% coverage
- **Documentation**: Docstrings for all public APIs

### Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=backend --cov-report=html

# Run specific test file
pytest tests/test_agents.py
```

---

## 🎨 Design Principles

### The NEEL Philosophy

1. **Aesthetic First** - Every UI change follows the glassmorphic design system
2. **24-Hour Rule** - Activity logs adjustable within 24 hours for data integrity
3. **Agent Audit** - Every AI response audited before delivery
4. **Privacy by Design** - User data encrypted and isolated
5. **Performance Matters** - <100ms API response time target
6. **Fail Gracefully** - Clear error messages and recovery paths

### UI/UX Guidelines

- Use glassmorphic cards for all content containers
- Maintain 16px base spacing unit
- Linear gradients for emphasis (purple → blue)
- Smooth transitions (200-300ms cubic-bezier)
- Dark mode color palette: #0A0E27 base
- Minimum 4.5:1 contrast ratio for accessibility

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass before submitting PR

### Areas for Contribution

- 🐛 Bug fixes and issue resolution
- ✨ New AI agent capabilities
- 📱 Mobile UI enhancements
- 📊 New analytics visualizations
- 🌍 Internationalization (i18n)
- 📝 Documentation improvements
- 🧪 Test coverage expansion

---

## 🗺️ Roadmap

### Version 1.1 (Q1 2024)
- [ ] iOS app support
- [ ] Voice input for activity logging
- [ ] Weekly productivity reports
- [ ] Team collaboration features

### Version 1.2 (Q2 2024)
- [ ] Advanced pattern recognition
- [ ] Integration with calendar apps
- [ ] Custom goal templates
- [ ] Export analytics to CSV/PDF

### Version 2.0 (Q3 2024)
- [ ] Multi-model AI support (Claude, GPT-4)
- [ ] Predictive scheduling assistant
- [ ] Habit formation tracking
- [ ] Social accountability features

See the [open issues](https://github.com/Edge-Explorer/NEEL/issues) for a full list of proposed features and known issues.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2024 Karan (Edge-Explorer)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [LangChain](https://www.langchain.com/) - AI orchestration framework
- [Google Gemini](https://deepmind.google/technologies/gemini/) - Large language model
- [React Native](https://reactnative.dev/) - Mobile framework
- [Expo](https://expo.dev/) - React Native toolchain
- [Render](https://render.com/) - Cloud platform
- [PostgreSQL](https://www.postgresql.org/) - Database system

---

## 📞 Contact & Support

**Developer**: Karan (Edge-Explorer)

- GitHub: [@Edge-Explorer](https://github.com/Edge-Explorer)
- Project Link: [https://github.com/Edge-Explorer/NEEL](https://github.com/Edge-Explorer/NEEL)
- Issues: [Report a bug](https://github.com/Edge-Explorer/NEEL/issues)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Edge-Explorer/NEEL?style=social)
![GitHub forks](https://img.shields.io/github/forks/Edge-Explorer/NEEL?style=social)
![GitHub issues](https://img.shields.io/github/issues/Edge-Explorer/NEEL)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Edge-Explorer/NEEL)
![GitHub last commit](https://img.shields.io/github/last-commit/Edge-Explorer/NEEL)

---

<div align="center">

**Built with ❤️ by Karan**

*NEEL - Your Neural Evolution & Executive Logic Partner*

[⬆ Back to Top](#-neel)

</div>
