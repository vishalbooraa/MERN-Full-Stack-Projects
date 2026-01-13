import express from "express";
import multer from "multer";
import { notesStorage } from "../cloudinaryConfig.js";
import { uploadNote, getAllNotes, deleteNote } from "../controllers/notesController.js";

const router = express.Router();
const upload = multer({ storage: notesStorage }); // 📦 Use Cloudinary storage for notes

// 🟢 Upload a note (unit + subject + topic + year + file)
router.post("/upload", upload.single("file"), uploadNote);

// 🟡 Get all notes (sorted by year → subject → unit → uploadedAt)
router.get("/getall", getAllNotes);

// 🔴 Delete a note
router.delete("/delete/:id", deleteNote);

export default router;
