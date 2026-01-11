const mongoose=require("mongoose")
const { Schema }=require("mongoose")


const HoldingsSchema= new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss:Boolean,
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    }
})

module.exports={HoldingsSchema};

