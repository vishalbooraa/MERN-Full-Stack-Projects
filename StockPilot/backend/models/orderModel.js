const {model}=require("mongoose")
const {orderSchema}=require("../schemas/orderSchema")

const orderModel=model("order",orderSchema)

module.exports={orderModel}