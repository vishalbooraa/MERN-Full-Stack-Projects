import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eduHub/schedules",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const notesStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eduHub/notes",
    resource_type: "raw",
    allowed_formats: ["pdf", "doc", "docx", "ppt", "pptx", "jpg", "png", "jpeg"],
  },
});

const pyqStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eduHub/pyqs",
    resource_type: "raw",
    allowed_formats: ["pdf", "doc", "docx", "pptx", "jpg", "png", "jpeg"], // Only PDF for PYQs
  },
});

export { cloudinary, storage, notesStorage, pyqStorage };
