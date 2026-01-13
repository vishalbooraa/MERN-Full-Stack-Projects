# Contact Form Backend Setup Guide

## Prerequisites
- Node.js (v14+) installed
- Gmail account with 2FA enabled

## Setup Steps

### 1. Install Dependencies
```bash
cd c:\Desktop\Portfolio
npm install
```

### 2. Create `.env` File
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Configure Gmail
1. Go to [Gmail Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate an **App Password** (Apps → Mail → Windows Computer)
4. Copy the 16-character app password

### 4. Update `.env`
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
PORT=5000
```

### 5. Update `index.html`
Add this before closing `</body>`:
```html
<script src="contact-handler.js"></script>
```

Also update the contact form:
```html
<form id="contactForm">
  <input type="text" id="name" name="name" placeholder="Enter your name" required>
  <input type="email" id="email" name="email" placeholder="Enter your email" required>
  <textarea id="message" name="message" rows="6" placeholder="Enter your message"></textarea>
  <button type="submit" class="btn3">Submit</button>
  <div id="responseMessage" style="margin-top: 15px; display: none;"></div>
</form>
```

### 6. Start Server (Local Development)
```bash
npm start
```
Server will run on `http://localhost:5000`

### 7. Test Contact Form
- Fill out the form and submit
- Check your Gmail inbox for the message
- Visitor should receive an auto-reply

## Deployment (Vercel / Heroku)
For production, deploy `server.js` to:
- **Vercel** (recommended for Node.js): Connect GitHub repo
- **Heroku**: `git push heroku main`
- **Railway**: Similar to Heroku

Then update `contact-handler.js` fetch URL to your deployed domain:
```javascript
const response = await fetch('https://your-domain.com/api/contact', {
```

## Security Notes
- Never commit `.env` to GitHub; add to `.gitignore`
- Use Gmail app passwords, never your actual Gmail password
- Consider rate-limiting for production (`express-rate-limit`)
