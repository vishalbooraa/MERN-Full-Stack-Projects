import LostFound from "../models/lostFoundModel.js";
import asyncWrap from "../utils/asyncWrap.js";
import ExpressError from "../utils/ExpressError.js";

// Add new item
export const addItem = asyncWrap(async (req, res) => {
  const { itemName, description, location, status, contact } = req.body;
  const userId=req.user._id;

  if (!itemName || !description || !location || !status || !contact) {
    throw new ExpressError(400, "All fields are required");
  }

  const newItem = new LostFound({ itemName, description, location, status, contact, user:userId });
  await newItem.save();
  res.status(201).json({ message: "Item added successfully", item: newItem });
});

// Get all items
export const getItems = asyncWrap(async (req, res) => {
  const items = await LostFound.find().sort({ date: -1 });
  res.status(200).json({ items });
});

// Delete an item
// Delete an item
export const deleteItem = asyncWrap(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  const item = await LostFound.findById(id);
  if (!item) throw new ExpressError(404, "Item not found");

  // Allow deletion if the user is the owner or an admin
  if (item.user.toString() !== userId.toString() && userRole !== "admin") {
    throw new ExpressError(403, "You are not authorized to delete this item");
  }

  await LostFound.findByIdAndDelete(id);
  res.status(200).json({ message: "Item deleted successfully" });
});

