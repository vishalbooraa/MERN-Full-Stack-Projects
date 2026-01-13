import { Schema, model } from "mongoose";

const scheduleSchema = new Schema({
  year: { 
    type: String, 
    enum: ["1st", "2nd", "3rd", "4th"],  
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true                       
  },
  updatedAt: { 
    type: Date, 
    default: Date.now                   
  },
});

const Schedule = model("Schedule", scheduleSchema);
export default Schedule;
