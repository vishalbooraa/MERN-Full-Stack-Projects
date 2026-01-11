import { Schema } from "mongoose";
import { model } from "mongoose";

const noticeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const noticeModel=model("Notice", noticeSchema);
export default noticeModel;
