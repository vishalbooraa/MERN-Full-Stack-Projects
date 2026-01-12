import CommentModel from "../models/commentModel.js";
import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";

export const activeCheck=async(req,res)=>{
    return res.status(200).json({message:"running"})
}


export const createPost=async(req,res)=>{
    try{
        const {token}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }

        const newPost=new PostModel({
            userId:user._id,
            body:req.body.body,
            media:req.file !== undefined ? req.file.path : "",
            fileType:req.file !== undefined ? req.file.mimetype.split("/")[1] : "",
        });
        await newPost.save();
        return res.status(201).json({message:"Post created successfully"});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const getAllPosts=async(req,res)=>{
    try{
        const posts=await PostModel.find().populate("userId","name username profilePicture").sort({createdAt:-1});
        return res.status(200).json({posts:posts});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const deletePost=async(req,res)=>{
    try{
        const {token,postId}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const post=await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        if(post.userId.toString()!==user._id.toString()){
            return res.status(403).json({message:"Forbidden"});
        }
        await PostModel.findByIdAndDelete(postId);
        return res.status(200).json({message:"Post deleted successfully"});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const commentPost=async(req,res)=>{
    try{
        const {token,postId,commentBody}=req.body;
        const user=await UserModel.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const post=await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        const comment=new CommentModel({
            userId:user._id,
            postId:postId,
            comment:commentBody,
        });
        await comment.save();
        return res.status(200).json({message:"Comment added successfully"});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const getComments=async(req,res)=>{
    try{
        const {postId}=req.body;
        const post=await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        const comments=await CommentModel.find({postId:postId}).populate("userId","name username profilePicture").sort({createdAt:-1});
        return res.status(200).json({comments:comments});
        

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}


export const deleteComment=async(req,res)=>{
    try{
        const {token,commentId}=req.body;
        const user=await UserModel.findOne({token:token});  
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const comment=await CommentModel.findById(commentId);
        if(!comment){
            return res.status(404).json({message:"Comment not found"});
        }   
        if(comment.userId.toString()!==user._id.toString()){
            return res.status(403).json({message:"Forbidden"});
        }
        await CommentModel.findByIdAndDelete(commentId);
        return res.status(200).json({message:"Comment deleted successfully"});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const increaseLikes=async(req,res)=>{
    try{
        const {postId}=req.body;
        const post=await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        post.likes+=1;
        await post.save();
        return res.status(200).json({message:"Like added successfully",likes:post.likes});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

