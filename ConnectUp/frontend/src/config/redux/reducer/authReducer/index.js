import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "@/config/redux/action/authAction";

const initialState={
    use:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    profileFetched:false,
    connections:[],
    connectionRequests:[],
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:()=>initialState,
        handleLoginUser:(state)=>{
            state.message="hello";
        },
        emptyMessage:(state)=>{
            state.message=""
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
            state.message="Loading...";
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.loggedIn=true;
            state.message="Login successful";
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.loggedIn=false;
            state.message=action.payload.message || "Login failed";
        })
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
            state.message="Loading...";
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.loggedIn=false;
            state.message="Registration successful.Please login!!";
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.loggedIn=false;
            state.message=action.payload.message || "Registration failed";
        })
    }
})

export const {reset,emptyMessage}=authSlice.actions;
export default authSlice.reducer;