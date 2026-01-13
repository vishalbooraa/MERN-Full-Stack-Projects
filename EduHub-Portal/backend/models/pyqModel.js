import { Schema, model } from "mongoose";

const pyqSchema = new Schema({
  subject: { type: String, required: true }, // e.g. "DBMS"
  year: { type: Number, required: true },    // e.g. 2015, 2022
  fileUrl: { type: String, required: true }, // Cloudinary file URL
  uploadedAt: { type: Date, default: Date.now }, // Upload timestamp
});

const Pyq = model("Pyq", pyqSchema);
export default Pyq;
