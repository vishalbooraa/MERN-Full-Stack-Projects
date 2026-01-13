import express from "express";
import { addNotice, getNotices, deleteNotice } from "../controllers/noticeControllers.js";

const router = express.Router();

// Get all notices
router.get("/getall", getNotices);

// Add a new notice
router.post("/add", addNotice);

// Delete a notice
router.delete("/delete/:id", deleteNotice);

export default router;
