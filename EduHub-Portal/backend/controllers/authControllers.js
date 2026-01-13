import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import { studentEmails,teacherEmails } from "../data/allowedEmail.js";
import asyncWrap from "../utils/asyncWrap.js";
import { createSecretToken } from "../utils/secretToken.js";
import ExpressError from "../utils/ExpressError.js";
import sendEmail from "../utils/sendMails.js";

export const signUp= asyncWrap(async(req,res)=>{
    const {name,email,password}=req.body;
    let role=null;
    if (studentEmails.includes(email)){
        role="student"
    }else if(teacherEmails.includes(email)){
        role="admin"
    }else{
        throw new ExpressError(400,"Email not allowed.Please enter department email")
    }

    const existingUser=await userModel.findOne({email});
    if(existingUser){
        throw new ExpressError(400,"User already exists")
    }

    const hashedPassword= await bcrypt.hash(password,10);

    const newUser= new userModel({
        name:name,
        email:email,
        password:hashedPassword,
        role:role,
    })
    await newUser.save();
    res.status(201).json({
        message:"Registered successfully",
        user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role
        }
    })

})

export const logIn=asyncWrap(async(req,res)=>{
    const {email,password}=req.body;
    const user= await userModel.findOne({email});
    console.log(user)
    if(!user){
        throw new ExpressError(400,"invalid email or password")
    }
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new ExpressError(400,"invalid email or password")
    }

    const token=createSecretToken(user._id);
        res.cookie("token",token,{
            httpOnly: true,
            sameSite: "Lax",
            secure:false
        })
        res.status(200).json({
        success: true,
        message: "User authenticated",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
});

})

export const logOut=asyncWrap(async(req,res)=>{
    res.clearCookie("token",{
        httpOnly: true,
        sameSite: "Lax",
        secure:false
    });
    res.status(200).json({success:true,message:"logged out"})
})


let otpStore = {};

export const sendOtp = asyncWrap(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ExpressError(400, "Email is required");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new ExpressError(404, "Email not registered");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore[email] = { otp, expiresAt };
  

  await sendEmail(
    email,
    "Password Reset OTP",
    `Your OTP for resetting password is: ${otp}`
  );

  res.status(200).json({ message: "OTP sent to registered email" });
});

export const resetPassword = asyncWrap(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ExpressError(400, "All fields are required");
  }
  const otpData = otpStore[email];
  if (!otpData) {
    throw new ExpressError(400, "No OTP request found for this email");
  }

  if (Date.now() > otpData.expiresAt) {
    delete otpStore[email];
    throw new ExpressError(400, "OTP expired. Please request a new one");
  }

  if (otpData.otp !== otp) {
    throw new ExpressError(400, "Invalid OTP");
  }

  const user = await userModel.findOne({ email });
  if (!user) throw new ExpressError(404, "User not found");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  delete otpStore[email];

  res.status(200).json({ message: "Password reset successful" });
});