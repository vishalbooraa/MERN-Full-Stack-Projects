import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  unit: { 
    type: String, 
    enum: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"], // Only 4 units per subject
    required: true 
  },
  subject: { type: String, required: true },   // e.g. "DBMS"
  topic: { type: String, required: true },     // e.g. "ER Diagram"
  year: { type: String, enum: ["1st", "2nd", "3rd", "4th"], required: true },
  fileUrl: { type: String, required: true },   // URL from Cloudinary
  uploadedAt: { type: Date, default: Date.now },
});

const Note = model("Note", noteSchema);
export default Note;
