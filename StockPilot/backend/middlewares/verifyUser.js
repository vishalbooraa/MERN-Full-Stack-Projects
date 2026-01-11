const ExpressError = require("../utility/ExpressError");
const {userModel}=require("../models/userModel")
const jwt=require("jsonwebtoken")
require('dotenv').config();


module.exports.verifyUser=async (req,res,next)=>{
    try{
        let token=req.cookies?.token;
        if(!token){
            throw new ExpressError(400,"Please login first");
    }
    let decodedToken=jwt.verify(token,process.env.TOKEN_KEY);
    if(!decodedToken.id){
        throw new ExpressError(400,"Invalid token");
    }
    let user= await userModel.findById(decodedToken.id);
    if(!user){
        throw new ExpressError(400,"User not found");
    }
    req.user=user;
    next()
    }catch(err){
        next(err)
    }
    
}