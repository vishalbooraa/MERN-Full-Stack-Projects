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
