import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"
import noticeRoutes from "./routes/notices.js"
import lostFoundRoutes from "./routes/lostFoundRoutes.js"
import scheduleRoutes from "./routes/scheduleRoutes.js"
import notesRoutes from "./routes/notesRoutes.js"
import pyqRoutes from "./routes/pyqRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import ExpressError from "./utils/ExpressError.js";
import { isAuthenticated } from "./utils/isAuthenticated.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const url=process.env.MONGO_URL

async function main(){
    await mongoose.connect(url)
}
main().then(()=>{
    console.log("connected to mongodb")
})
.catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Department Portal API running");
});


app.use("/user", authRoutes);
app.get("/me",isAuthenticated,(req, res) => {
  res.status(200).json({ user: req.user });
});
app.use(isAuthenticated)
app.use("/notice",noticeRoutes);
app.use("/lostfound", lostFoundRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/notes",notesRoutes)
app.use("/pyqs", pyqRoutes)
app.use("/ai",aiRoutes)




app.all(/.*/, (req, res, next) => {
     next(new ExpressError(404, "Page Not Found"));
});


app.use((err,req,res,next)=>{
  console.log(err)
    let{status=500,message="something went wrong"}=err;
    res.status(status).json({message})
})


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
