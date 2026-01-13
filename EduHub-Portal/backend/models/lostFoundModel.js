import { Schema, model } from "mongoose";

const lostFoundSchema = new Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["lost", "found"], required: true },
  contact: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const LostFound = model("LostFound", lostFoundSchema);
export default LostFound;
