import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import ProfileModel from "../models/profileModel.js";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";
import ConnectionRequestModel from '../models/connectionModel.js';

const convertUserDataToPDF=async(userData)=>{
    const doc= new PDFDocument();
    const outputPath=crypto.randomBytes(16).toString("hex")+".pdf";
    const stream=fs.createWriteStream("uploads/"+outputPath);
    doc.pipe(stream);
    doc.image(`${userData.userId.profilePicture}`,{align:"center",width:100});
    doc.fontSize(14).text(`Name: ${userData.userId.name}`);
    doc.fontSize(14).text(`Username: ${userData.userId.username}`);
    doc.fontSize(14).text(`Email: ${userData.userId.email}`);
    doc.fontSize(14).text(`Bio: ${userData.bio || "N/A"}`);
    doc.fontSize(14).text(`Current Position: ${userData.currentPosition || "N/A"}`);

    doc.fontSize(14).text("Past Work Experience: ")
    userData.pastworK?.forEach((work,index)=>{
        doc.fontSize(14).text(`company Name : ${work.company || "N/A"}`);
        doc.fontSize(14).text(`Position : ${work.position || "N/A"}`);
        doc.fontSize(14).text(`Years : ${work.years || "N/A"}`);
    });
    doc.end();
    return outputPath
}


export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await UserModel.findOne({
            $or: [{ email }, { username }]
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();

        const profile = new ProfileModel({
            userId: newUser._id
        });

        await profile.save();

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }   
        const token= crypto.randomBytes(32).toString("hex");
        user.token=token;
        await user.save();
        return res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const uploadProfilePicture = async (req, res) => {
    try{
        const { token } = req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
       user.profilePicture=req.file.path;
       await user.save();
       return res.status(200).json({message:"Profile picture updated successfully"});
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const updateUser=async(req,res)=>{
    try{
        const {token,...newProfileData}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const {username,email}=newProfileData;
        const existingUser=await UserModel.findOne({$or:[{username},{email}]});
        if(existingUser && existingUser._id.toString()!==user._id.toString()){
            return res.status(400).json({message:"Username or email already taken"});
        }
        Object.assign(user,newProfileData);
        await user.save();
        return res.status(200).json({message:"Profile updated successfully"});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}


export const getUserAndProfile=async(req,res)=>{
    try{
        const {token}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const profile=await ProfileModel.findOne({userId:user._id})
        .populate("userId","name email username profilePicture");
        return res.status(200).json({user:profile});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}


export const updateProfileData=async(req,res)=>{
    try{
        const {token,...newProfileData}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const profile=await ProfileModel.findOne({userId:user._id});
        if(!profile){
            return res.status(404).json({message:"Profile not found"});
        }
        Object.assign(profile,newProfileData);
        await profile.save();
        return res.status(200).json({message:"Profile data updated successfully"});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const getAllUserProfiles=async(req,res)=>{
    try{
        const profiles=await ProfileModel.find()
        .populate("userId","name email username profilePicture");
        return res.status(200).json({profiles:profiles});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}


export const downloadUserResume=async(req,res)=>{
    try{
        const user_id=req.query.id
        const profile=await ProfileModel.findOne({userId:user_id})
        .populate("userId","name email username profilePicture resume");
        let outputPath= await convertUserDataToPDF(profile);
        return res.json({"message":outputPath});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const sendConnectionRequest=async(req,res)=>{
    try{
        const {token,connectionId}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const connectionUser=await UserModel.findById(connectionId);
        if(!connectionUser){
            return res.status(404).json({message:"User to connect not found"});
        }
       const existingRequest=await ConnectionRequestModel.findOne({
        userId:user._id,
        connectionId:connectionId
       });

       const request=new ConnectionRequestModel({
        userId:user._id,
        connectionId:connectionId,
         });
        await request.save();
        return res.status(200).json({message:"Connection request sent successfully"});

    }catch{
        return res.status(500).json({message:error.message});
    }
}


export const sentConnectionsRequests=async(req,res)=>{
    try{
        const {token}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const requests=await ConnectionRequestModel.find({userId:user._id})
        .populate("connectionId","name email username profilePicture");
        return res.status(200).json({requests:requests});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const recievedConnectionsRequests=async(req,res)=>{
    try{
        const {token}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const connections=await ConnectionRequestModel.find({connectionId:user._id})
        .populate("userId","name email username profilePicture");
        return res.status(200).json({connections:connections});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const respondToConnectionRequest=async(req,res)=>{
    try{
        const {token,requestId,action_type}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const request=await ConnectionRequestModel.findById(requestId);
        if(!request){
            return res.status(404).json({message:"Connection request not found"});
        }
        if(action_type==="accept"){
            request.status_accepted=true;
        }else if(action_type==="reject"){
            request.status_accepted=false;
        }else{
            return res.status(400).json({message:"Invalid action type"});
        }
        await request.save();
        return res.status(200).json({message:"Connection request responded successfully"});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}