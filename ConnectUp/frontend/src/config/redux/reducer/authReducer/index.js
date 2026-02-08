import { createSlice } from "@reduxjs/toolkit";
import {
  getAboutUser,
  getAllUsers,
  loginUser,
  registerUser,
} from "@/config/redux/action/authAction";

const initialState = {
  user: null,
  all_users: [],
  connections: [],
  connectionRequests: [],

  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  profileFetched: false,
  isTokenThere: false,
  message: "",
  all_profiles_fetched: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    emptyMessage: (state) => {
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    },
    setTokenIsThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= LOGIN =================
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;      // ✅ FIX
        state.isSuccess = false;    // ✅ FIX
        state.message = "Loading...";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loggedIn = false;
        state.message = action.payload?.message || "Login failed";
      })

      // ================= REGISTER =================
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;      // ✅ FIX (MAIN BUG)
        state.isSuccess = false;    // ✅ FIX
        state.message = "Loading...";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Registration successful. Please login!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Registration failed";
      })

      // ================= GET LOGGED-IN USER =================
      .addCase(getAboutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileFetched = true;
        state.user = action.payload.user;
      })

      // ================= GET ALL USERS =================
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.all_profiles_fetched = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.all_users = action.payload;
        state.all_profiles_fetched = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.all_profiles_fetched = false;
        state.message = action.payload?.message || "Failed to fetch users";
      });
  },
});

export const {
  reset,
  emptyMessage,
  setTokenIsThere,
  setTokenIsNotThere,
} = authSlice.actions;

export default authSlice.reducer;
