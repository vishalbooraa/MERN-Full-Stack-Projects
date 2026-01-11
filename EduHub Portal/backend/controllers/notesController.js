// backend/controllers/notesController.js
import Note from "../models/notesModel.js";
import asyncWrap from "../utils/asyncWrap.js";
import ExpressError from "../utils/ExpressError.js";

//  Upload note
export const uploadNote = asyncWrap(async (req, res, next) => {
  const { unit, subject, year, topic } = req.body; // Updated "title" → "unit"

  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ExpressError(403, "Only admins can upload notes");
  }

  if (!unit || !subject || !year || !topic || !req.file) {
    throw new ExpressError(400, "All fields and file are required");
  }

  const newNote = new Note({
    unit,
    subject,
    year,
    topic,
    fileUrl: req.file.path,
  });

  await newNote.save();
  res.status(201).json({ message: "✅ Note uploaded successfully", note: newNote });
});

// Get all notes with backend grouping and search
export const getAllNotes = asyncWrap(async (req, res, next) => {
  const { search = "" } = req.query;

  // Case-insensitive search by subject, unit, or topic
  const regex = new RegExp(search, "i");

  // Fetch notes from DB matching search
  const notes = await Note.find({
    $or: [
      { subject: regex },
      { unit: regex },
      { topic: regex },
    ],
  }).sort({ year: 1, unit: 1, uploadedAt: -1 }); // Sorting by year, unit, uploadedAt

  // Group notes by subject → unit → array of notes
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.subject]) acc[note.subject] = {};
    if (!acc[note.subject][note.unit]) acc[note.subject][note.unit] = [];
    acc[note.subject][note.unit].push(note);
    return acc;
  }, {});

  res.status(200).json({ groupedNotes });
});

//  Delete note
export const deleteNote = asyncWrap(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ExpressError(403, "Only admins can delete notes");
  }

  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return next(new ExpressError(404, "Note not found"));
  res.status(200).json({ message: "🗑 Note deleted successfully" });
});
