import Notice from "../models/noticeModel.js";
import asyncWrap from "../utils/asyncWrap.js";
import ExpressError from "../utils/ExpressError.js";

export const addNotice = asyncWrap(async (req, res) => {
  const { title, content, createdBy } = req.body;

  if (!title || !content || !createdBy) {
    throw new ExpressError(400, "All fields are required");
  }

  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ExpressError(403, "Only admins can add notices");
  }

  const newNotice = new Notice({ title, content, createdBy });
  await newNotice.save();
  res.status(201).json({ message: "Notice added successfully", notice: newNotice });
});

export const getNotices = asyncWrap(async (req, res) => {
  const notices = await Notice.find().sort({ date: -1 });
  res.status(200).json({ notices });
});

export const deleteNotice = asyncWrap(async (req, res) => {
  const { id } = req.params;

  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ExpressError(403, "Only admins can delete notices");
  }

  const deleted = await Notice.findByIdAndDelete(id);
  if (!deleted) throw new ExpressError(404, "Notice not found");
  res.status(200).json({ message: "Notice deleted successfully" });
});
