# 🚀 NoteStack

A modern full-stack Notes application built using **React**, **FastAPI**, and **PostgreSQL** following a clean **three-tier architecture**.

![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Python](https://img.shields.io/badge/Python-3.11-yellow)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)

---

## 📖 Overview

NoteStack is a full-stack notes management application that allows users to:

* Create notes
* View notes
* Search notes
* Delete notes
* Track note creation timestamps

The project is built to demonstrate:

* Frontend development with React
* Backend API development with FastAPI
* PostgreSQL database integration
* RESTful API design
* Three-tier application architecture

---

## 🏗️ Architecture

```text
┌─────────────────────────┐
│      React Frontend     │
│    Vite + TailwindCSS   │
└────────────┬────────────┘
             │ HTTP/JSON
             ▼
┌─────────────────────────┐
│      FastAPI Backend    │
│ SQLAlchemy + Pydantic   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      PostgreSQL 15      │
│       Database Tier     │
└─────────────────────────┘
```

---

## ✨ Features

### Notes Management

* Create Note
* List All Notes
* View Single Note
* Search Notes
* Delete Note

### System Features

* UUID-based note IDs
* PostgreSQL persistence
* FastAPI REST APIs
* SQLAlchemy ORM
* Alembic database migrations
* Responsive UI
* Basic error handling

---

## 🛠️ Tech Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* Axios

### Backend

* Python 3.11
* FastAPI
* SQLAlchemy
* Alembic
* Pydantic v2
* Uvicorn

### Database

* PostgreSQL 15

---

## 📂 Project Structure

```text
notestack/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── NoteCard.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── routers/
│   │       └── notes.py
│   │
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   │
│   ├── alembic.ini
│   └── requirements.txt
│
├── .env.example
└── README.md
```

---

## 📡 API Endpoints

### Health Check

```http
GET /health
```

Response

```json
{
  "status": "ok"
}
```

---

### Get All Notes

```http
GET /api/notes
```

---

### Create Note

```http
POST /api/notes
```

Request

```json
{
  "title": "My First Note",
  "body": "This is my note."
}
```

---

### Get Note By ID

```http
GET /api/notes/{id}
```

---

### Delete Note

```http
DELETE /api/notes/{id}
```

---

## 🗄️ Database Schema

### notes

| Column     | Type         | Description    |
| ---------- | ------------ | -------------- |
| id         | UUID         | Primary Key    |
| title      | VARCHAR(200) | Required       |
| body       | TEXT         | Optional       |
| created_at | TIMESTAMP    | Auto Generated |

---

## ⚙️ Environment Variables

Create a `.env` file using:

```env
POSTGRES_USER=notestack
POSTGRES_PASSWORD=notestack123
POSTGRES_DB=notestack_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

VITE_API_URL=http://localhost:8000
```

---

## 🚀 Running the Project

### 1. Clone Repository

```bash
git clone https://github.com/Jayeshchapekar/NoteStack-app.git
cd NoteStack-app
```

---

### 2. Setup PostgreSQL

Create database:

```sql
CREATE DATABASE notestack_db;
```

---

### 3. Start Backend

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate:

**Windows**

```bash
venv\Scripts\activate
```

**Linux/macOS**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
alembic upgrade head
```

Start server:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend URL:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

### 4. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🎯 Learning Objectives

This project demonstrates:

* Three-tier architecture
* REST API development
* React frontend development
* PostgreSQL integration
* Database migrations
* API consumption with Axios
* State management
* CRUD operations

---

## 🔮 Future Enhancements

Planned features:

* Update Note
* User Authentication (JWT)
* User Registration
* User-specific Notes
* Note Categories
* Tags
* Pagination
* Dark / Light Theme Toggle
* Docker Support
* CI/CD Pipelines
* Kubernetes Deployment
* Monitoring & Logging

---

## 📸 Screenshots

### Dashboard

Add screenshots here after deployment:

```text
docs/screenshots/dashboard.png
```

---

## 👨‍💻 Author

**Jayesh Chapekar**

GitHub: https://github.com/Jayeshchapekar

---

## 📄 License

This project is created for learning and educational purposes.
