# 📈 StockPilot — Full Stack Trading Dashboard

*StockPilot* is a full-stack web application inspired by trading platforms like Zerodha and Groww. It allows users to monitor stocks, manage portfolios, place buy/sell orders, and view real-time updates on watchlists and holdings.

---

## 🚀 Features

✔ User Authentication (Signup & Login with JWT)  
✔ Secure session using cookies & protected routes  
✔ Buy & Sell orders  
✔ Real-time updates with Socket.IO  
✔ Watchlist with price & net percentage  
✔ Visual portfolio analytics with charts  
✔ Holdings, Positions & Orders dashboard  
✔ Responsive React UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Chart.js, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Real-Time Updates | Socket.IO |
| Auth | JWT (JSON Web Tokens) |
| API Testing | Postman (optional) |

# Backend Setup

cd backend
npm install

# Create .env file

MONGO_URL=<Your MongoDB URI>
TOKEN_KEY=<Your JWT Secret Key>

# Start Backend

npm start

# Frontend Setup

cd dashboard
npm install
npm start
