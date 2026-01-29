# StayBloom 🌸

StayBloom is a full-stack web application that allows users to browse, add, and manage listings, leave reviews, and explore locations on an interactive map. This project is built using **Node.js, Express, MongoDB, and EJS**, with cloud-based image storage using **Cloudinary**.

---

## **Features**

- ✅ User Authentication & Authorization (Sign Up, Log In, Role-based access)
- ✅ Add, Edit, Delete Listings (CRUD)
- ✅ Upload and manage images using **Cloudinary**
- ✅ Leave Reviews and Ratings on Listings
- ✅ Interactive Maps using **Mapbox**
- ✅ Server-side validation using **Joi**
- ✅ Flash messages for notifications
- ✅ Secure session handling with **express-session** and **connect-mongo**

---

## **Tech Stack**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js
- **Templating:** EJS
- **File Upload:** Multer + Cloudinary
- **Validation:** Joi
- **Frontend:** Bootstrap 5, Font Awesome, Mapbox GL JS
- **Session Storage:** connect-mongo

---

## **Installation & Setup**


1.Install dependencies:

npm install


2.Create a .env file with the following:

MONGO_URL=<Your MongoDB URL>
SECRET=<Your Session Secret>
CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUD_API_KEY=<Your Cloudinary API Key>
CLOUD_API_SECRET=<Your Cloudinary API Secret>
MAP_TOKEN=<Your Mapbox Token>


3.Run the application:

nodemon app.js

