import express from "express";
import multer from "multer";
import { pyqStorage } from "../cloudinaryConfig.js"; // your Cloudinary storage setup
import { uploadPyq, getAllPyqs, deletePyq } from "../controllers/pyqControllers.js";

const router = express.Router();
const upload = multer({ storage: pyqStorage }); // Use Cloudinary storage

// 🟢 Upload a PYQ
router.post("/upload", upload.single("file"), uploadPyq);

// 🟡 Get all PYQs (with optional search query)
router.get("/getall", getAllPyqs);

// 🔴 Delete a PYQ
router.delete("/delete/:id", deletePyq);

export default router;
