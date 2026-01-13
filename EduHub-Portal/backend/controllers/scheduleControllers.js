import Schedule from "../models/scheduleModel.js";
import asyncWrap from "../utils/asyncWrap.js";
import ExpressError from "../utils/ExpressError.js";

// 🟢 Upload or Update Schedule
export const uploadSchedule = asyncWrap(async (req, res, next) => {
    const { year } = req.body;

    // Check if user is admin
    if (req.user.role !== "admin") {
      throw new ExpressError(403, "Only admins can upload schedules");
    }

    if (!year || !req.file) {
      throw new ExpressError(400, "All fields and file are required");
    }

    let schedule = await Schedule.findOne({ year });

    if (schedule) {
      schedule.imageUrl = req.file.path;
      schedule.updatedAt = new Date();
      await schedule.save();

      // ✅ Only one response here
      return res.status(200).json({
        message: "✅ Schedule updated successfully",
        schedule,
      });
    }

    const newSchedule = new Schedule({
      year,
      imageUrl: req.file.path,
    });

    await newSchedule.save();

    // ✅ Only one response here
    return res.status(201).json({
      message: "✅ Schedule uploaded successfully",
      schedule: newSchedule,
    });
});

// 🟡 Get All Schedules
export const getAllSchedules = asyncWrap(async (req, res, next) => {
  const schedules = await Schedule.find().sort({ year: 1 });
  return res.status(200).json({ schedules });
});

// 🔴 Delete Schedule
export const deleteSchedule = asyncWrap(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ExpressError(403, "Only admins can delete schedules");
  }

  const schedule = await Schedule.findByIdAndDelete(req.params.id);
  if (!schedule) {
    return next(new ExpressError(404, "Schedule not found."));
  }

  return res.status(200).json({
    message: "🗑️ Schedule deleted successfully",
  });
});
