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

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({postId}, thunkApi) => {
    try {
      const response = await clientServer.delete("/delete_post", {
        data: {
          postId: postId,
          token: localStorage.getItem("token")
        }
      });
      return postId;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to delete post"
      );
    }
  }
);

export const incrementLike = createAsyncThunk(
  "post/incrementLike",
  async ({postId}, thunkApi) => {
    try {      const response = await clientServer.post("/increment_post_likes", {
        postId: postId,
        token: localStorage.getItem("token")
      });
      return {postId,likes: response.data.likes};
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to like post"
      );
    } 
  }
);

export const getAllComments = createAsyncThunk(
  "post/getAllComments",
  async ({postId}, thunkApi) => {
    try {
      const response = await clientServer.get("/get_comments", {
        params: {
          postId: postId,
        }
      });
      return {postId,comments: response.data.comments};
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

export const postComment = createAsyncThunk(
  "post/postComment",
  async ({postId,body}, thunkApi) => {
    try {
      const response = await clientServer.post("/comment_post", {
        postId: postId,
        commentBody: body,  
        token: localStorage.getItem("token")
      });
      return response.data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to post comment"
      );
    } 
  }
);

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async ({commentId}, thunkApi) => {
    try {
      const response = await clientServer.delete("/delete_comment", {
        data: { commentId: commentId, token: localStorage.getItem("token") }
      });
      return response.data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to delete comment"
      );
    }
  }
);