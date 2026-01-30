# Documind-AI: The Intelligent Document Q&A System 📄🧠

**Documind-AI** is an enterprise-grade, privacy-first document intelligence platform that enables users to upload documents (PDF, DOCX, TXT), process them with advanced OCR, and query their contents using natural language. Built with production-ready architecture featuring LangChain, FAISS vector stores, and Ollama LLMs, wrapped in a premium mobile-first interface.

---

## 🌐 Live Repository

**[GitHub Repository](https://github.com/Edge-Explorer/DOCUMIND-AI)** 👈 *Explore the complete source code.*

---

## 🚀 Vision

Documind-AI redefines document interaction by transforming static files into conversational knowledge bases. Designed for professionals, researchers, and knowledge workers who need instant, contextual access to information buried within their document collections—all while maintaining complete privacy through local processing.

---

## 🏗️ Technical Architecture

### 1. **Intelligence Engine (Backend)**

* **API Framework**: Flask REST API with modular blueprint architecture
* **AI Orchestration**: LangChain for prompt engineering and workflow management
* **LLM Runtime**: Ollama for local model inference (Llama3, Mistral, Gemma)
* **Vector Database**: FAISS for high-performance semantic similarity search
* **Document Processing**: PyMuPDF + Tesseract OCR for multi-format support
* **Database**: PostgreSQL with SQLAlchemy ORM for persistent storage
* **Authentication**: JWT-based secure session management with bcrypt hashing
* **Infrastructure**: Docker Compose orchestration for one-command deployment

### 2. **Mobile Experience (Frontend)**

* **Framework**: React Native with Expo SDK for cross-platform development
* **Language**: TypeScript for type-safe, maintainable code
* **UI/UX**: Premium glassmorphic design with real-time streaming responses
* **State Management**: React Hooks with optimistic UI updates
* **Icons**: Lucide-React-Native for consistent iconography
* **API Client**: Axios with interceptors for authentication

---

## ✨ Key Features

### 🤖 **Multi-LLM Architecture**

Seamlessly switch between local language models (Llama3, Mistral, Gemma) directly from the mobile interface. No cloud dependencies—all inference happens on your machine.

### 🔍 **Advanced Document Processing**

Production-grade OCR pipeline using Tesseract for scanned PDFs and complex document layouts. Supports:
* Native text extraction from digital PDFs
* OCR processing for scanned documents and images
* DOCX and TXT file parsing
* Automatic text chunking with overlap for context preservation

### 🎯 **Semantic Search Engine**

FAISS-powered vector similarity search retrieves the most relevant document sections for each query, ensuring precise, context-aware answers with source attribution.

### 🔒 **Privacy-Centric Design**

Zero cloud dependencies for document processing and AI inference. Your documents never leave your local environment:
* Documents stored locally with PostgreSQL
* Vector embeddings computed on-device
* LLM inference through local Ollama server
* Complete data sovereignty

### 📱 **Premium Mobile Interface**

Modern React Native UI featuring:
* Real-time streaming AI responses with typing indicators
* Glassmorphism design language with smooth animations
* Intuitive document management and upload
* Conversation history with persistent storage
* Dynamic model selection and configuration

### 📊 **Source Attribution**

Complete transparency with document-level source tracking. Every AI response includes references to the specific documents used, maintaining academic rigor and trustworthiness.

---

## 📋 System Requirements

### Backend Requirements
* Docker & Docker Compose (v2.0+) **OR**
* Python 3.9+ for manual setup
* PostgreSQL 13+ (included in Docker setup)
* Ollama installed and running locally
* Tesseract OCR 4.x

### Frontend Requirements
* Node.js 18+ and npm
* Expo Go app (iOS/Android) for mobile testing
* Android Studio (for building standalone APK)

---

## �️ Deployment Guide

### Step 1: Ollama Configuration

**Critical**: Configure Ollama for network access to enable Docker communication.

```bash
# Pull your preferred language model
ollama pull llama3

# Enable network access (choose one method):

# Method 1: Via Ollama Settings UI
# Navigate to Settings → Enable "Expose Ollama to network"

# Method 2: Via environment variable
export OLLAMA_HOST=0.0.0.0
# Then restart the Ollama service
```

**Available Models:**
* `llama3` - Meta's Llama 3 (Recommended)
* `mistral` - Mistral 7B
* `gemma` - Google's Gemma 2B/7B

### Step 2: Backend Deployment

#### Option A: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Edge-Explorer/DOCUMIND-AI.git
cd DOCUMIND-AI

# Launch all services (backend + PostgreSQL)
docker-compose up --build

# Backend accessible at http://localhost:5000
# Database schema automatically initialized
```

The Docker setup includes:
* Flask API server
* PostgreSQL database with persistent volumes
* Automatic schema migrations
* Health check endpoints

#### Option B: Manual Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration:
# - DATABASE_URL=postgresql://user:password@localhost:5432/documind
# - SECRET_KEY=your-secret-key-here
# - OLLAMA_BASE_URL=http://localhost:11434

# Initialize database schema
python setup_db.py

# Start Flask development server
python app.py
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd documind-frontend

# Install dependencies
npm install

# Configure API endpoint
# Edit src/api/config.ts and set:
# - API_BASE_URL to your local IP (e.g., http://192.168.1.100:5000)
# - For Docker setup, use your computer's local network IP

# Start Expo development server
npx expo start

# Scan QR code with Expo Go app on your mobile device
```

**Finding Your Local IP:**
* **Windows**: `ipconfig` (look for IPv4 Address)
* **macOS/Linux**: `ifconfig` or `ip addr show`
* **Important**: Use local network IP (192.168.x.x), NOT localhost

---

## 📁 Project Structure

```
DOCUMIND-AI/
├── app.py                 # Flask application entry point
├── models.py              # SQLAlchemy database models
├── database.py            # Database connection and session management
├── ollama_llm.py         # Ollama API integration and LLM wrapper
├── setup_db.py           # Database initialization script
├── docker-compose.yml    # Docker orchestration configuration
├── Dockerfile            # Backend container definition
├── requirements.txt      # Python dependencies
│
├── routes/               # API endpoint blueprints
│   ├── auth.py          # Authentication endpoints (register, login)
│   ├── documents.py     # Document upload and management
│   ├── chat.py          # Q&A conversation endpoints
│   └── models.py        # Model selection and management
│
├── ingest/              # Document processing pipeline
│   ├── processor.py     # Multi-format document parser
│   └── indexer.py       # FAISS vector store management
│
├── qa/                  # Question-answering logic
│   ├── retriever.py     # Semantic search and context retrieval
│   └── chain.py         # LangChain orchestration
│
├── migrations/          # Database migration scripts
│   └── alembic/         # Alembic migration versions
│
└── documind-frontend/   # React Native mobile application
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── screens/     # Main app screens
    │   ├── api/         # API client configuration
    │   └── services/    # Business logic and state management
    ├── assets/          # Images, fonts, and icons
    └── app.json         # Expo configuration
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/documind

# Security
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
DEFAULT_MODEL=llama3

# Application Settings
UPLOAD_FOLDER=./documents
VECTOR_STORE_PATH=./vector_stores
```

### Docker Configuration

The `docker-compose.yml` file orchestrates two services:

```yaml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: documind
      POSTGRES_USER: documind
      POSTGRES_PASSWORD: documind123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://documind:documind123@db:5432/documind
      OLLAMA_BASE_URL: http://host.docker.internal:11434
    depends_on:
      - db
```

---

## 🎓 API Documentation

### Authentication Endpoints

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Document Management

**Upload Document**
```http
POST /api/documents/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <document.pdf>
```

**List Documents**
```http
GET /api/documents
Authorization: Bearer <token>

Response:
{
  "documents": [
    {
      "id": 1,
      "filename": "research_paper.pdf",
      "upload_date": "2024-01-20T10:30:00Z",
      "file_type": "pdf",
      "page_count": 25
    }
  ]
}
```

### Question Answering

**Ask Question**
```http
POST /api/chat/ask
Authorization: Bearer <token>
Content-Type: application/json

{
  "question": "What are the main findings of the research?",
  "model": "llama3"
}

Response:
{
  "answer": "The research findings indicate...",
  "sources": [
    {
      "document": "research_paper.pdf",
      "page": 5,
      "relevance_score": 0.89
    }
  ]
}
```

---

## 🛠️ Development Workflow

### Running Tests

```bash
# Backend tests
pytest tests/ -v

# Frontend tests
cd documind-frontend
npm test
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### Building Production APK

```bash
cd documind-frontend

# Configure EAS Build
eas build:configure

# Build Android APK
eas build --platform android --profile production

# Build will be available in Expo dashboard
```

---

## 📊 Performance Optimization

### Vector Store Optimization

The FAISS index uses HNSW (Hierarchical Navigable Small World) graphs for efficient similarity search:

* **Chunk Size**: 1000 characters with 200-character overlap
* **Embedding Model**: sentence-transformers/all-MiniLM-L6-v2
* **Index Type**: HNSW with M=16, efConstruction=200

### Caching Strategy

* **Vector embeddings**: Cached in FAISS index files
* **Document chunks**: Stored in PostgreSQL for reuse
* **LLM responses**: Optional caching layer for repeated queries

---

## 🔒 Security Features

* **JWT Authentication**: Secure, stateless session management
* **Password Hashing**: bcrypt with configurable work factor
* **SQL Injection Prevention**: SQLAlchemy ORM parameterized queries
* **File Upload Validation**: Type checking and size limits
* **CORS Configuration**: Restricted to trusted origins
* **Environment Isolation**: Sensitive credentials in .env files

---

## 📜 Design Principles

* **Privacy First**: No external API calls for document processing or inference
* **Modularity**: Clean separation between ingestion, retrieval, and generation
* **Scalability**: Stateless API design for horizontal scaling
* **Maintainability**: Type hints, comprehensive logging, and documentation
* **User Experience**: Premium UI with real-time feedback and error handling

---

## 🎯 Use Cases

* **Research Analysis**: Query academic papers and research documents
* **Legal Document Review**: Search through contracts and legal briefs
* **Technical Documentation**: Navigate complex technical manuals
* **Knowledge Management**: Build searchable knowledge bases from reports
* **Educational Content**: Study from textbooks and lecture notes

---

## 🚧 Roadmap

- [x] Core document Q&A functionality
- [x] Multi-format support (PDF, DOCX, TXT)
- [x] OCR for scanned documents
- [x] Mobile application
- [x] Docker deployment
- [ ] Multi-document comparison mode
- [ ] Conversation export and sharing
- [ ] Advanced analytics dashboard
- [ ] Plugin system for custom extractors
- [ ] Web-based admin panel

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

* **LangChain**: For the powerful LLM orchestration framework
* **Ollama**: For enabling local LLM inference
* **Meta AI**: For the Llama 3 model
* **FAISS**: For efficient vector similarity search
* **Tesseract**: For OCR capabilities

---

**Developed with ❤️ by [Karan Shelar](https://github.com/Edge-Explorer)**
