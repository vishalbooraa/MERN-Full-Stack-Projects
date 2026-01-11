const {model}=require("mongoose")
const {HoldingsSchema}=require("../schemas/holdingShema")

const HoldingsModel=model("holding",HoldingsSchema)

module.exports={HoldingsModel}