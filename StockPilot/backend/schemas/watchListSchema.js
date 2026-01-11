const {Schema}=require("mongoose")

const watchListSchema= new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
})

module.exports={watchListSchema}