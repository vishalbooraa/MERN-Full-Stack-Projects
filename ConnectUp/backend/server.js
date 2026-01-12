import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app=express();
app.use(cors());

app.use(express.json());
app.use(postRoutes)
app.use(userRoutes)
app.use(express.static("uploads"));

const start= async()=>{
    const connectDB= await mongoose.connect(process.env.MONGO_URL);
    app.listen(9080,()=>{
        console.log("Server is listening on port 9080")
    })
}



start();
