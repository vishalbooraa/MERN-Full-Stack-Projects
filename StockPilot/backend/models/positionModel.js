const {model}=require("mongoose")
const {positionSchema} =require("../schemas/positionChema")

const positionModel = model("position", positionSchema);

module.exports={positionModel}