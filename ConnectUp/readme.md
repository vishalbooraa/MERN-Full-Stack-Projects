# ConnectUp - MERN Social Network Platform

ConnectUp is a **professional social media platform inspired by LinkedIn**, built using the **MERN Stack** (MongoDB, Express, React, Node.js).  
This project demonstrates full-stack web development with real-world features including user authentication, professional profiles, connection management, and social posting.

---

## 🎯 Features

### 🔐 Authentication & User Management
- User registration and login with secure password hashing (bcrypt)
- Token-based authentication (stored in localStorage)
- User profile with name, username, email, and profile picture
- Profile picture upload with preview

### 👤 Professional Profiles
- View and edit user profiles
- Add/edit professional information:
  - Current position
  - Work experience (company, position, years)
  - Education (school, degree, field of study)
  - Bio
- Download user profile as PDF resume
- View profiles of other users

### 🤝 Connection System
- Send connection requests to other users
- View received connection requests on "My Connections" page
- Accept or reject connection requests
- Real-time status updates (pending/connected)
- View your connections/network
- Auto-refresh every 3 seconds and on page visibility change

### 📝 Posts & Engagement
- Create posts with text and media
- Like posts
- Comment on posts
- Delete your own posts and comments
- View recent activity on user profiles

### 📱 Responsive Design
- Mobile-friendly UI
- Desktop-optimized layout
- Responsive button and form layouts

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules
- **HTTP Client**: Axios (via clientServer wrapper)
- **Routing**: Next.js File-based routing

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (Token-based)
- **Password Hashing**: bcrypt
- **File Upload**: Multer (for profile pictures)
- **PDF Generation**: PDFKit

---

## 📁 Project Structure

```
ConnectUp/
├── backend/
│   ├── controllers/
│   │   ├── userController.js       # User, auth, profile, connection logic
│   │   └── postController.js       # Posts and comments logic
│   ├── models/
│   │   ├── userModel.js            # User schema
│   │   ├── profileModel.js         # Profile schema (bio, experience, education)
│   │   ├── postModel.js            # Post schema
│   │   ├── commentModel.js         # Comment schema
│   │   └── connectionModel.js      # Connection request schema
│   ├── routes/
│   │   ├── userRoutes.js           # User and connection endpoints
│   │   └── postRoutes.js           # Post and comment endpoints
│   ├── uploads/                    # Uploaded files (profile pictures, etc.)
│   ├── server.js                   # Express server setup
│   ├── package.json
│   └── api.http                    # API endpoint reference
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── dashboard/          # Dashboard/home page
    │   │   ├── profile/            # User's own profile (editable)
    │   │   ├── view_profile/       # View other users' profiles
    │   │   ├── myConnections/      # Manage connection requests
    │   │   └── ...
    │   ├── components/             # Reusable React components
    │   ├── layout/                 # Layout components (sidebar, navbar)
    │   ├── styles/                 # Global styles
    │   ├── config/
    │   │   ├── index.jsx           # Axios clientServer config
    │   │   └── redux/
    │   │       ├── action/         # Redux async thunks (auth, posts)
    │   │       └── reducer/        # Redux reducers (auth, posts)
    │   └── App.jsx
    ├── package.json
    ├── next.config.mjs
    └── jsconfig.json
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file (if needed) with MongoDB URI:**
   ```
   MONGO_URI=mongodb://localhost:27017/connectup
   PORT=9080
   ```

3. **Start the server:**
   ```bash
   npm run dev
   # or
   node server.js
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🔌 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login

### User Profile
- `GET /get_user_and_profile` - Get current user's profile
- `GET /profile_based_on_username` - Get another user's profile
- `POST /update_profile_picture` - Upload profile picture
- `POST /update_profile_data` - Update profile info (bio, experience, education, current position)

### Connections
- `POST /send_connection_request` - Send connection request
- `GET /sent_connection_request` - Get sent requests
- `GET /received_connection_request` - Get received requests
- `POST /respond_connection_request` - Accept/reject connection request

### Posts
- `POST /create_post` - Create new post
- `GET /all_posts` - Get all posts
- `DELETE /delete_post/:id` - Delete post
- `POST /like_post` - Like a post
- `POST /create_comment` - Add comment
- `GET /all_comments/:postId` - Get post comments
- `DELETE /delete_comment/:id` - Delete comment

### Other
- `GET /download_user_resume` - Download profile as PDF
- `GET /all_user_profiles` - Get all user profiles

---

## 🎨 Key Components

### Profile Management
- Edit personal info inline with Save/Cancel buttons
- Upload profile picture with preview
- Add/edit/remove experience entries
- Add/edit/remove education entries
- Auto-save to backend and refresh

### Connection Flow
- View other users and send connection requests
- "My Connections" page shows pending and accepted connections
- Accept/reject pending requests
- Real-time status sync every 3 seconds
- Refresh on tab visibility change

### Posts & Feed
- Create posts with optional media
- Like and comment on posts
- View recent activity on profile pages
- Delete own posts/comments

---

## 🐛 Known Issues & Fixes

### Connection Status Sync
**Issue**: Sender doesn't see "Connected" status when receiver accepts.  
**Fix**: Added auto-refresh of connection requests every 3 seconds and on page visibility change.

---

## 👨‍💻 Development Notes

### Redux State Structure
```javascript
auth: {
  user: { userId, bio, education, pastworK, currentPost },
  connections: [],           // Received connection requests
  connectionRequests: [],    // Sent connection requests
  isTokenThere: boolean
}

posts: {
  posts: [],
  comments: [],
  postId: ""
}
```

### Profile Data Schema
- **User**: name, email, username, password, token, profilePicture
- **Profile**: userId, bio, currentPost, pastworK (experience), education
- **Experience**: company, position, years
- **Education**: school, degree, fieldOfStudy

---

## 📝 Future Enhancements

- [ ] Notifications system for connection requests
- [ ] Real-time updates with WebSocket
- [ ] Search and filter users
- [ ] User roles (admin, moderator)
- [ ] Direct messaging
- [ ] User recommendations
- [ ] Dark mode
- [ ] Email verification
- [ ] Password reset functionality

---

## 📄 License

This project is created for learning purposes.

---

## 🤝 Contributing

Feel free to fork and submit pull requests with improvements!
