const {userSchema}=require("../schemas/userSchema")
const {model}=require("mongoose")

const userModel= model("user",userSchema)
module.exports={userModel}
