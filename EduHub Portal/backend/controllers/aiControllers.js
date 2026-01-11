// controllers/aiController.js
import asyncWrap from "../utils/asyncWrap.js";
import Thread from "../models/Thread.js";
import { generateAIResponse } from "../utils/aiAssistant.js";
import ExpressError from "../utils/ExpressError.js";


// 📌 Chat and Save Messages
export const chatWithAssistant = asyncWrap(async (req, res) => {
  const { threadId, message } = req.body;
  const userId=req.user._id;

  if (!threadId || !message) {
    throw new ExpressError(400, "threadId and message are required");
  }

  let thread = await Thread.findOne({ threadId });

  if (!thread) {
    thread = new Thread({
      threadId,
      user:userId,
      title: message,
      messages: [{ role: "user", content: message }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  } else {
    thread.messages.push({ role: "user", content: message });
  }

  const assistantReply = await generateAIResponse(message);
  thread.messages.push({ role: "assistant", content: assistantReply });

  thread.updatedAt = Date.now();
  await thread.save();

  res.json({ reply: assistantReply });
});


// 📌 Get All Threads
export const getAllThreads = asyncWrap(async (req, res) => {
  const userId=req.user._id
  const threads = await Thread.find({user:userId}).sort({ updatedAt: -1 });
  res.json(threads);
});


// ✅ Updated: Use ExpressError
export const getParticularThread = asyncWrap(async (req, res) => {
  const { threadId } = req.params;
  const thread = await Thread.findOne({ threadId });

  if (!thread) {
    throw new ExpressError(404, "Thread not found");
  }

  res.json(thread.messages);
});


// ✅ Updated: Use ExpressError
export const deleteThread = asyncWrap(async (req, res) => {
  const { threadId } = req.params;
  const deletedThread = await Thread.findOneAndDelete({ threadId });

  if (!deletedThread) {
    throw new ExpressError(404, "Thread not found");
  }

  res.json({ success: "Thread deleted successfully" });
});
