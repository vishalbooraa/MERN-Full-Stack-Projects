const {model}=require("mongoose")
const {watchListSchema}=require("../schemas/watchListSchema")

const watchListModel= model("WatchList",watchListSchema)
 module.exports={watchListModel}