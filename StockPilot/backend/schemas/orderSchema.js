const mongoose=require("mongoose")
const {Schema}=require("mongoose")

const orderSchema= new Schema({
    name:String,
    price:{
        type: Number,
        required:false
    },
    quantity:{
        type:Number,
        required:false
    },
    mode:String,
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true 
    }
})

module.exports={orderSchema}