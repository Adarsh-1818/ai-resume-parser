# AI Resume Parser SaaS

A full-stack AI-powered resume analysis platform that evaluates CVs against job descriptions using LLMs (OpenAI / Claude).

---

## 🚀 Live Features

- JWT Authentication (Register / Login)
- Upload Resume (PDF parsing)
- AI-powered CV analysis
- ATS Score generation
- Skill gap detection
- Job description matching
- Scan history tracking
- Clean SaaS dashboard UI

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js + Express
- Prisma ORM
- SQLite (dev)
- Multer (file upload)

### AI Layer
- OpenAI GPT API
- Claude API (optional fallback)

---

## 📸 UI Preview

<img width="741" height="572" alt="Login" src="https://github.com/user-attachments/assets/343375f3-b539-4f2b-a0fe-fdbb66f3546d" />
<img width="1751" height="748" alt="Dashboard" src="https://github.com/user-attachments/assets/d9b83456-4810-4eb8-bb64-eacf9a9f11e1" />
<img width="1005" height="386" alt="History" src="https://github.com/user-attachments/assets/10accf37-14d9-4090-b698-ea610f06f4ab" />


## 🏗️ Architecture

Frontend → REST API → Backend → AI Model → Response → UI

---

🔥 Key Highlight
Real-world AI integration
File upload + PDF parsing
Production-style dashboard UI
Modular backend architecture
Scalable SaaS design

---

👨‍💻 Author

Adarsh Kumar
MSc Computer Science | AI Software Engineer

---

## ⚙️ Setup Instructions

### Backend & Frontend
```bash
cd backend
npm install
npx prisma db push
npm run dev

# Frontend

cd frontend
npm install
npm run dev
