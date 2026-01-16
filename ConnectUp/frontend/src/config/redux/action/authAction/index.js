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
    "user/register",async(user,thunkApI)=>{}
);