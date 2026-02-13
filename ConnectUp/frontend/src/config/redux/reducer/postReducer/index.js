import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getAllComments } from "../../action/postAction";

const initialState = {
  posts: [],
  comments: [],
  postId: "",
  isError: false,
  postFetched: false,
  isLoading: false,
  message: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== POSTS =====
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "Fetching all posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postFetched = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ===== COMMENTS =====
      .addCase(getAllComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "Fetching comments...";
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.comments = action.payload.comments;
        state.postId = action.payload.postId;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetPostId } = postSlice.actions;
export default postSlice.reducer;
