import express from "express";
import { addItem, getItems, deleteItem } from "../controllers/lostFoundControllers.js";

const router = express.Router();

// Get all items
router.get("/getall", getItems);

// Add new item
router.post("/add", addItem);

// Delete item
router.delete("/delete/:id", deleteItem);

export default router;
