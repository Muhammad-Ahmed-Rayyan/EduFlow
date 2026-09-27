<div align="center">

# 📚 EduFlow Pakistan

*AI Multi-Agent Education Platform — Addressing Pakistan's Education Crisis*

![Last Commit](https://img.shields.io/github/last-commit/Muhammad-Ahmed-Rayyan/EduFlow) ![languages](https://img.shields.io/github/languages/count/Muhammad-Ahmed-Rayyan/EduFlow)

<br>

Built with the tools and technologies:
![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

</div>

---

## 🧠 Project Summary

**EduFlow** is a 9-agent AI platform built to address Pakistan's education crisis through AI-powered grading, feedback, and school monitoring. A single student submission flows through a pipeline of specialized agents — language translation, plagiarism/AI-content integrity checks, rubric-based grading, teacher human-in-the-loop review, multilingual feedback generation, parent notification, class-level analytics, and automated intervention planning.

🏆 Placed 2nd at the National AI Hackathon '26 Karachi Regional (KSBL, organized by atomcamp; ~60 teams, ~176 participants). Built with a team of three: Rayyan, Um-Ul-Baneen, and Syed Fawad Haider Kazmi.

---

## 🚀 Features

- 🌐 **Zubaan Agent (Input)**
  Language detection and translation on every incoming submission.

- 📥 **Ingestion Agent**
  Content normalisation and rubric parsing for every submission.

- 🕵️ **Integrity Agent**
  Plagiarism and AI-generated content detection via FAISS similarity search, run in parallel with grading.

- 📝 **Grading Agent**
  Per-criterion rubric scoring powered by Gemini, run in parallel with integrity checks.

- 👩‍🏫 **Human-in-the-Loop Review**
  Teacher approve / override / flag step, with a 24-hour timeout reminder if left unreviewed.

- 💬 **Feedback Agent**
  Gemini-generated student report after teacher approval.

- 🌐 **Zubaan Agent (Output)**
  Translates the final feedback report back into the student's language.

- 📲 **Waalid Agent**
  Sends a WhatsApp summary to the parent after feedback is finalized.

- 📊 **Analytics Agent**
  Class-level trend tracking and intervention detection after every approval.

- 🩹 **Taleem Gap Agent**
  Triggers a 14-day SNC-aligned recovery plan when a student scores below 50% twice.

- 👻 **Ghost School Detector**
  Daily cron job monitoring school submission patterns, independent of the per-submission flow.

---

## 🏗️ Architecture

```bash
Student Submission
      │
      ▼
[Step 1] Zubaan Agent          — Language detection + translation
      │
      ▼
[Step 2] Ingestion Agent        — Content normalisation + rubric parsing
      │
      ▼
[Step 3] ┌─────────────────────┐ ← PARALLEL
         │  Integrity Agent    │   Plagiarism + AI detection (FAISS)
         │  Grading Agent      │   Per-criterion rubric scoring (Gemini)
         └─────────────────────┘
      │
      ▼
[Step 4] Integrity threshold check (>70% → flag)
      │
      ▼
[Step 5] Human-in-the-Loop     — Teacher approve / override / flag
      │ (24h timeout → reminder)
      ▼
[Step 6] Feedback Agent         — Student report generation (Gemini)
      │
      ▼
[Step 7] ┌─────────────────────┐ ← PARALLEL
         │  Zubaan Agent (out) │   Translate feedback to student language
         │  Waalid Agent       │   WhatsApp summary to parent
         └─────────────────────┘
      │
      ▼
[Step 8] Analytics Agent        — Class trends + intervention detection
         └── [Taleem Gap Agent] — 14-day recovery plan (if triggered)

[Step 9] Ghost School Detector  — Daily cron, separate from submission flow
```

---

## 🤖 Agents

| # | Agent | Trigger | Purpose |
|---|---|---|---|
| 1 | Zubaan (input) | Every submission | Language detection + translation |
| 2 | Ingestion | Every submission | Content normalisation + rubric parsing |
| 3 | Integrity | Parallel with Grading | Plagiarism (FAISS) + AI detection |
| 4 | Grading | Parallel with Integrity | Per-criterion rubric scoring |
| 5 | Feedback | After teacher approval | Student report generation |
| 6 | Zubaan (output) | After feedback | Translate report to student language |
| 7 | Waalid | After feedback | WhatsApp parent summary |
| 8 | Analytics | After every approval | Class trends + intervention flagging |
| 9 | Taleem Gap | If 2× below 50% | 14-day SNC-aligned recovery plan |
| 10 | Ghost School | Daily cron | School submission pattern monitoring |

---

## 🔧 Setup & Installation

> Make sure Python 3.11+, Node.js 18+, and PostgreSQL (running on `localhost:5432`) are installed.

### Backend

```bash
cd backend

# Create virtualenv
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure env
copy ..\env.example .env
:: Edit .env — set GEMINI_API_KEY at minimum
:: DEMO_MODE=True means no real API calls are needed for the demo

# Seed demo data
python seed.py

# Start server
uvicorn main:app --reload --port 8000
:: API docs at http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install
npm run dev
:: Dashboard at http://localhost:3000
```

### Demo Login

The dashboard auto-logs in as **Ms. Ayesha Raza** via `GET /auth/demo`. No Google OAuth credentials needed in `DEMO_MODE`.

---

## 🔑 API Configuration

See `.env.example` for the full list. Minimum required for the demo:

```.env
GEMINI_API_KEY="your-key-here"
DEMO_MODE=True
```

---

## ☁️ Cloud Run Deployment

```bash
# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT/eduflow .

# Deploy
gcloud run deploy eduflow \
  --image gcr.io/YOUR_PROJECT/eduflow \
  --platform managed \
  --region asia-south1 \
  --set-env-vars DEMO_MODE=True,GEMINI_API_KEY=your-key
```

---

<div align="center">

⭐ Found this project useful? Drop a star on GitHub!

</div>
