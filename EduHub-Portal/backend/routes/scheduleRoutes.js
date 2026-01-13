import express from "express";
import multer from "multer";
import { storage } from "../cloudinaryConfig.js";
import { uploadSchedule, getAllSchedules, deleteSchedule } from "../controllers/scheduleControllers.js";
import asyncWrap from "../utils/asyncWrap.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/upload", upload.single("schedule"),uploadSchedule);
router.get("/getall",getAllSchedules);
router.delete("/delete/:id",deleteSchedule);

export default router;
