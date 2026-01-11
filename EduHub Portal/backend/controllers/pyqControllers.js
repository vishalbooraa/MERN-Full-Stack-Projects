import Pyq from "../models/pyqModel.js";
import asyncWrap from "../utils/asyncWrap.js";
import ExpressError from "../utils/ExpressError.js";

// 🟢 Upload PYQ
export const uploadPyq = asyncWrap(async (req, res, next) => {
  const { subject, year } = req.body;

  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ExpressError(403, "Only admins can upload PYQs");
  }

  // Validate fields
  if (!subject || !year || !req.file) {
    throw new ExpressError(400, "All fields and file are required");
  }

  const parsedYear = parseInt(year);
  if (isNaN(parsedYear) || parsedYear < 2000 || parsedYear > new Date().getFullYear() + 1) {
    throw new ExpressError(403, "Only admins can upload PYQs");
  }

  // Save to DB
  const newPyq = new Pyq({
    subject,
    year: parsedYear,
    fileUrl: req.file.secure_url || req.file.path,
  });

  await newPyq.save();
  res.status(201).json({ message: "✅ PYQ uploaded successfully", pyq: newPyq });
});

// 🟡 Get All PYQs (Grouped, Sorted, and Searchable)
export const getAllPyqs = asyncWrap(async (req, res, next) => {
  const { search = "" } = req.query;

  let searchConditions = [];
  if (search) {
    const regex = new RegExp(search, "i");
    searchConditions.push({ subject: regex });

    const yearNum = parseInt(search);
    if (!isNaN(yearNum)) {
      searchConditions.push({ year: yearNum });
    }
  }

  // Fetch from DB and sort: subject(A→Z), year(asc), uploadedAt(desc)
  const pyqs = await Pyq.find(searchConditions.length ? { $or: searchConditions } : {})
    .sort({ subject: 1, year: 1, uploadedAt: -1 });

  // Group by subject -> year -> array of pyqs
  const groupedPyqs = pyqs.reduce((acc, pyq) => {
    if (!acc[pyq.subject]) acc[pyq.subject] = {};
    if (!acc[pyq.subject][pyq.year]) acc[pyq.subject][pyq.year] = [];
    acc[pyq.subject][pyq.year].push(pyq);
    return acc;
  }, {});

  res.status(200).json({ groupedPyqs });
});


// 🔴 Delete PYQ
export const deletePyq = asyncWrap(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ExpressError(403, "Only admins can delete PYQs");
  }

  const pyq = await Pyq.findByIdAndDelete(req.params.id);
  if (!pyq) return next(new ExpressError(404, "PYQ not found"));
  res.status(200).json({ message: "🗑 PYQ deleted successfully" });
});
