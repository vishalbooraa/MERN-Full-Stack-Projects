import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema= new Schema({
    name:{
        type: String, 
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["student", "admin"],
        default: "student"
    }
})

const userModel = model("User",userSchema)

export default userModel;
