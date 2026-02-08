import { clientServer } from "@/config/index.jsx";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser=createAsyncThunk(
    "user/login",async(user,thunkApI)=>{
        try{
            const response=await clientServer.post("/login",{
                email:user.email,
                password:user.password
            });
            if(response.data.token){
                localStorage.setItem("token",response.data.token);
            }else{
                return thunkApI.rejectWithValue({
                    message:"token not provided"
                });
            }
            return thunkApI.fulfillWithValue(response.data.token);
        }catch(error){
            return thunkApI.rejectWithValue(error.response.data);
        }
    }
)

export const registerUser=createAsyncThunk(
    "user/register",async(user,thunkApI)=>{
        try{
            const response=await clientServer.post("/register",{
                username:user.username,
                password:user.password,
                email:user.email,
                name:user.name
            })
            return response.data;
        }catch(err){
            return thunkApI.rejectWithValue(err.response.data)
        }
    }
);

export const getAboutUser=createAsyncThunk(
    "user/getAboutUser",
    async(user,thunkApI)=>{
        try{
            const response=await clientServer.get("/get_user_and_profile",{
                params:{
                    token:user.token
                }
            })
            return thunkApI.fulfillWithValue(response.data)
        }catch(error){
            return thunkApI.rejectWithValue(error.response.data)
        }
    }
)

export const getAllUsers= createAsyncThunk(
    "user/getAllUsers",
    async(_,thunkApI)=>{
        try{
            const response=await clientServer.get("all_user_profiles");
            return thunkApI.fulfillWithValue(response.data.profiles);
        }catch(error){
            return thunkApI.rejectWithValue(error.response.data);
        }
    }); 