<p align="center">
  <img src="image.png" alt="Make My Clinic Banner" width="100%" />
</p>

<h1 align="center">🏥 Make My Clinic — Intelligent Hospital Management System</h1>

<p align="center">
  <b>A full-stack, real-time hospital management platform powered by AI/ML for smart triage, wait-time prediction, and intelligent hospital routing.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-Python-000000?logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-Chatbot-8E75B2?logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Mapbox-GL_JS-000000?logo=mapbox&logoColor=white" />
</p>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [AI/ML Components](#-aiml-components)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Resume / Portfolio Description](#-resume--portfolio-description)
- [License](#-license)

---

## 🧠 About The Project

**Make My Clinic** is a comprehensive hospital management system designed as a capstone project that bridges the gap between traditional clinic operations and modern intelligent healthcare delivery.

The platform provides **role-based dashboards** for Admins, Doctors, Patients, Receptionists, and Inventory Managers — each with tailored views and real-time data. It goes beyond CRUD operations by integrating **Operating System scheduling algorithms** (Priority Scheduling & Shortest Job First) for patient queue optimization, a **Random Forest ML model** for hospital recommendations and wait-time predictions, and a **Gemini AI-powered chatbot** for instant medical guidance.

### What Makes This Different?
- **OS-Level Queue Scheduling** — Uses Priority and SJF algorithms to compute real-time patient wait times, just like a process scheduler in an operating system.
- **Dual-Engine Triage** — Combines deterministic OS scheduling with historical AI pattern matching for wait-time estimation.
- **AI Hospital Routing** — A trained Random Forest model recommends the optimal hospital based on disease, time-of-day, and proximity, then auto-plots the route on a Mapbox map.
- **Real-Time Architecture** — Socket.IO enables live updates across dashboards for bed status, queue positions, and notifications.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based secure login/registration
- Role-based access control (Admin, Doctor, Patient, Receptionist, Inventory)

### 👨‍⚕️ Role-Based Dashboards
| Role | Capabilities |
|---|---|
| **Admin** | Hospital analytics, staff management, system overview |
| **Doctor** | Patient queue, appointment management, prescription generation |
| **Patient** | Profile, medical history, AI triage map, live queue status |
| **Receptionist** | Patient admission, ward/bed management, billing |
| **Inventory** | Stock tracking, predictive reorder alerts, low-stock warnings |

### 🤖 AI/ML Integration
- **Smriti AI Chatbot** — Gemini-powered medical assistant available globally via floating action button
- **AI Hospital Triage** — Random Forest model recommends optimal hospital + ward based on symptoms, arrival time, and proximity
- **ML Wait-Time Prediction** — Trained model estimates patient wait times from historical data
- **Smart Route Plotting** — AI prediction auto-plots Mapbox driving directions to the recommended hospital

### 🏗️ OS-Inspired Scheduling
- **Priority Scheduling** — Critical patients are automatically moved up the queue
- **Shortest Job First (SJF)** — Optimizes total wait time by scheduling shorter consultations first
- **Live Queue Tracker** — Dual-engine display comparing OS math estimates vs AI pattern estimates

### 📊 Advanced Features
- Smart Bed Management visual grid with real-time occupancy
- PDF Prescription generation (jsPDF + html2canvas)
- Email/SMS-style notification system
- Interactive charts and analytics (Chart.js + Recharts)
- Payment/Billing flow with modal interface
- Fully responsive mobile-first design

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (React + Vite)                │
│        Tailwind CSS · Framer Motion · Mapbox GL          │
│                    Port: 5173                            │
└────────────┬──────────────────────────┬──────────────────┘
             │ REST + WebSocket         │ REST API
             ▼                          ▼
┌────────────────────────┐  ┌───────────────────────────┐
│  BACKEND (Node.js)     │  │  AI/ML SERVICE (Flask)    │
│  Express · Socket.IO   │  │  Scikit-learn · Pandas    │
│  Prisma · JWT          │  │  Random Forest Models     │
│  Port: 4000            │  │  Port: 5000               │
└────────────┬───────────┘  └───────────────────────────┘
             │
             ▼
┌────────────────────────┐
│  DATABASE (PostgreSQL) │
│  Prisma ORM Managed    │
└────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Library |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Styling Framework |
| Framer Motion | Animations & Transitions |
| Mapbox GL JS | Interactive Hospital Maps |
| Socket.IO Client | Real-time Updates |
| Chart.js + Recharts | Data Visualization |
| Recoil | State Management |
| jsPDF | PDF Generation |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API Server |
| TypeScript | Type Safety |
| Prisma | Database ORM |
| PostgreSQL | Relational Database |
| Socket.IO | WebSocket Server |
| JWT + bcrypt | Authentication |
| Zod | Request Validation |

### AI/ML Microservice
| Technology | Purpose |
|---|---|
| Python + Flask | ML API Server |
| Scikit-learn | Random Forest Models |
| Pandas | Data Processing |
| Pickle | Model Serialization |

### External APIs
| API | Purpose |
|---|---|
| Google Gemini | AI Chatbot Responses |
| Mapbox GL JS | Map Rendering |
| Mapbox Directions | Driving Route Calculation |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ 
- **Python** 3.8+
- **PostgreSQL** (for full backend functionality)
- **npm** or **yarn**

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/make-my-clinic.git
cd make-my-clinic
```

**2. Setup the Frontend**
```bash
cd client
npm install
cp .env.example .env
# Edit .env with your API keys (see Environment Variables section)
npm run dev
```

**3. Setup the Backend**
```bash
cd server
npm install
# Create a .env file (see Environment Variables section)
npx prisma generate
npm run dev
```

**4. Setup the AI/ML Service**
```bash
cd AIML
pip install flask scikit-learn pandas
python app.py
```

**5. Open in browser**
```
http://localhost:5173
```

---

## 🔑 Environment Variables

### Frontend (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:4000          # Node.js backend URL
VITE_ML_API_URL=http://localhost:5000            # Flask ML service URL
VITE_GEMINI_API_KEY=your_gemini_api_key_here     # Google Gemini API Key
VITE_MAPBOX_TOKEN=your_mapbox_token_here         # Mapbox Public Access Token
```

### Backend (`server/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/caresync
JWT_SECRET=your_jwt_secret_here
PORT=4000
END_POINT=http://localhost:5173
```

---

## 📁 Project Structure

```
make-my-clinic/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── Patient/        # Patient-specific components
│   │   │   ├── Shared/         # Global components (Chatbot, etc.)
│   │   │   └── ...
│   │   ├── layouts/            # Dashboard layouts per role
│   │   ├── pages/              # Page components
│   │   │   ├── Patient/        # Map, Profile, History, Notifications
│   │   │   ├── Doctor/         # Queue, Prescriptions
│   │   │   ├── Admin/          # Analytics, Management
│   │   │   ├── Receptionist/   # Admissions, Billing
│   │   │   └── Inventory/      # Stock Management
│   │   ├── DB/                 # Local mock data
│   │   └── App.tsx             # Root component & routing
│   └── .env.example            # Environment variable template
│
├── server/                     # Node.js Backend
│   ├── controllers/            # Route handlers
│   ├── routes/                 # API route definitions
│   ├── prisma/                 # Database schema & migrations
│   ├── middlewares/            # Auth & validation middleware
│   └── index.ts                # Server entry point
│
├── AIML/                       # Python ML Microservice
│   ├── app.py                  # Flask API server
│   ├── hospital_recommendation.py   # Hospital recommendation model training
│   ├── hospital_recommendation.pkl  # Trained hospital model
│   ├── timeEstimator.py        # Wait-time prediction model training
│   ├── timeEstimator.pkl       # Trained wait-time model
│   └── EL_FINAL_HOSPITAL_DATA.csv   # Training dataset
│
└── README.md
```

---

## 🤖 AI/ML Components

### 1. Hospital Recommendation Engine
- **Algorithm:** Random Forest Classifier
- **Input:** Disease/symptoms, arrival time, day of week, distances to hospitals
- **Output:** Recommended hospital name + ward assignment
- **Endpoint:** `POST /recommend`

### 2. Wait-Time Prediction Engine
- **Algorithm:** Random Forest Regressor
- **Input:** Day of week, arrival time, disease type
- **Output:** Estimated wait time in minutes
- **Endpoint:** `POST /predict-wait-time`

### 3. Smriti AI Chatbot
- **Model:** Google Gemini Pro
- **Context:** Pre-loaded with Make My Clinic medical assistant context
- **Availability:** Global floating button on all dashboard pages

---

## 🌐 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `client`
4. Add environment variables from `client/.env.example`
5. Deploy

### Backend → Render / Railway
1. Create a new **Web Service** on [render.com](https://render.com)
2. Set **Root Directory** to `server`
3. **Build Command:** `npm install && npx prisma generate`
4. **Start Command:** `npm start`
5. Add backend environment variables

### AI/ML Service → Render / Railway
1. Create a new **Web Service**
2. Set **Root Directory** to `AIML`
3. **Start Command:** `pip install flask scikit-learn pandas && python app.py`

> **Important:** After deploying backend services, update `VITE_API_BASE_URL` and `VITE_ML_API_URL` in Vercel to point to your deployed URLs.

---

## 📸 Screenshots

<p align="center">
  <img src="image.png" alt="MakeMyClinic " width="100%" />
</p>

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📝 Resume / Portfolio Description

Use the snippets below to add **Make My Clinic** to your resume, LinkedIn, or portfolio.

---

### 🔹 One-Line Summary *(for skills sections or quick mentions)*

> Built a full-stack, AI-powered hospital management system with real-time scheduling, ML-based triage, and role-based dashboards using React, Node.js, PostgreSQL, and Python/Flask.

---

### 🔹 Short Project Description *(2–3 sentences, great for a resume project entry)*

> **Make My Clinic** — AI-Powered Hospital Management System *(Full-Stack · TypeScript · Python · React)*
>
> Designed and developed a production-grade, multi-role hospital management platform featuring OS-inspired patient queue scheduling (Priority & SJF algorithms), a Random Forest ML model for intelligent hospital routing and wait-time prediction, and a Gemini AI medical chatbot. Built with React 18, TypeScript, Node.js/Express, PostgreSQL (Prisma ORM), Python/Flask microservice, and real-time Socket.IO updates across five role-based dashboards (Admin, Doctor, Patient, Receptionist, Inventory Manager).

---

### 🔹 Detailed Resume Bullet Points *(pick the most relevant ones)*

- Architected a **microservices-based** full-stack application with a React 18 + TypeScript frontend, a Node.js/Express REST API backend, and a decoupled Python/Flask AI/ML service, all communicating over HTTP and WebSockets.
- Implemented **role-based access control (RBAC)** with JWT authentication and five distinct user roles (Admin, Doctor, Patient, Receptionist, Inventory Manager), each with tailored dashboards and protected routes.
- Integrated **Machine Learning** (Scikit-learn Random Forest Classifier & Regressor) for smart hospital recommendation based on disease type, time-of-day, and geolocation, and for real-time patient wait-time prediction.
- Built an **OS-inspired queue scheduling engine** using Priority Scheduling and Shortest Job First (SJF) algorithms to optimize patient triage, combined with historical AI pattern matching for a dual-engine wait-time estimate.
- Implemented **real-time features** using Socket.IO for live queue updates, bed-availability broadcasting, and appointment notifications across all connected dashboards.
- Developed an **interactive hospital triage map** with Mapbox GL JS that plots AI-recommended hospitals, calculates driving routes, and displays live distance/time estimates.
- Managed a **relational PostgreSQL database** using Prisma ORM with schema-driven migrations, modeling complex relationships across 12+ entities (hospitals, doctors, patients, wards, queues, tickets, inventory).
- Integrated **Google Gemini Pro API** as a context-aware medical assistant chatbot, globally accessible via a floating action button across all authenticated pages.
- Built a **PDF prescription generator** using jsPDF and html2canvas, enabling doctors to export formatted prescriptions directly from the dashboard.
- Engineered **interactive analytics dashboards** with Chart.js and Recharts for real-time hospital statistics, OPD metrics, and inventory tracking, consumed by Admin and Inventory Manager roles.
- Designed a **responsive, mobile-first UI** with Tailwind CSS and Framer Motion animations, achieving a consistent experience across all device sizes.
- Configured a **monorepo workspace** with separate `client/`, `server/`, and `AIML/` directories and deployment pipelines to Vercel (frontend), Render (backend/ML service), and a managed PostgreSQL cloud database.

---

### 🔹 LinkedIn / Portfolio Project Card Format

**Project Name:** Make My Clinic — Intelligent Hospital Management System

**Tech Stack:** React 18 · TypeScript · Node.js · Express · PostgreSQL · Prisma ORM · Python · Flask · Scikit-learn · Socket.IO · Mapbox GL JS · Google Gemini AI · JWT · Tailwind CSS · Framer Motion

**Summary:**
Full-stack hospital management platform featuring 5 role-based dashboards, OS-level queue scheduling (Priority + SJF), ML-driven hospital routing and wait-time prediction, real-time updates via Socket.IO, an AI medical chatbot (Gemini), interactive Mapbox triage maps, and PDF prescription generation. Deployed on Vercel + Render with a decoupled Flask ML microservice.

**GitHub:** https://github.com/Abhiman67/MakeMyClinic

---

<p align="center">
  Architected by Abhiman67
</p>
