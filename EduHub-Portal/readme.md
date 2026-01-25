# 🎓 EduHub – Full Stack Academic Portal

EduHub is a full-stack academic portal designed for colleges and universities to centralize academic resources and student services. The platform enables secure access to notes, previous year questions (PYQs), notices, schedules, lost & found, and an AI-powered academic assistant.

---

## 🚀 Features

- 🔐 *Authentication & Authorization*
  - JWT-based authentication
  - Role-based access control (Student / Admin)
- 📚 *Notes & PYQs Management*
  - Upload, search, and download all file types
  - Secure file storage using Cloudinary
- 📢 *Digital Notice Board*
  - Admin-managed academic announcements
- 📅 *Schedule Management*
  - Upload and view academic schedules
- 🔍 *Lost & Found System*
  - Post and track lost/found items
- 🤖 *AI Assistant*
  - Academic query assistance using Google Gemini API
  - Chat history stored per user
- 📩 *Password Recovery*
  - OTP-based password reset using Nodemailer

---

## 🛠 Tech Stack

### Frontend
- React.js
- CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Other Tools & Services
- JWT (Authentication)
- Cloudinary (File Uploads & Downloads)
- Nodemailer (Email & OTP)
- Google Gemini API (AI Assistant)
- Git & GitHub (Version Control)

---

## ⚙️ Setup Instructions

# Backend
cd backend
npm install

# .env file

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
GOOGLE_GEMINI_API_KEY=your_api_key

# backend
nodemon index.js

# frontend

cd frontend
npm install
npm run dev

