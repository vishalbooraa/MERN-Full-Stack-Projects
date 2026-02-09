import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkApi) => {
    try {
      const response = await clientServer.get("/get_all_posts");
      return response.data.posts;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to fetch posts"
      );
    }
  }
);


export const createPost = createAsyncThunk(
  "post/createPost",
  async (userData, thunkApi) => {
    try {
      const {file,body}=userData;
      const formData=new FormData();
      formData.append("token",localStorage.getItem("token"));
      formData.append("body",body);
      formData.append("media",file);
      const response = await clientServer.post("/create_post",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      return response.data.post;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to create post"
      );
    }
  }
);