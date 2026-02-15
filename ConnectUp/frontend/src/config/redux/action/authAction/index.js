import { clientServer } from "@/config/index.jsx";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkApI) => {
    try {
      const response = await clientServer.post("/login", {
        email: user.email,
        password: user.password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkApI.rejectWithValue({
          message: "token not provided",
        });
      }
      return thunkApI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkApI.rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkApI) => {
    try {
      const response = await clientServer.post("/register", {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
      });
      return response.data;
    } catch (err) {
      return thunkApI.rejectWithValue(err.response.data);
    }
  },
);

export const getAboutUser = createAsyncThunk(
  "user/getAboutUser",
  async (user, thunkApI) => {
    try {
      const response = await clientServer.get("/get_user_and_profile", {
        params: {
          token: user.token,
        },
      });
      return thunkApI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkApI) => {
    try {
      const response = await clientServer.get("all_user_profiles");
      return thunkApI.fulfillWithValue(response.data.profiles);
    } catch (error) {
      return thunkApI.rejectWithValue(error.response.data);
    }
  },
);

export const sendConnectionRequest = createAsyncThunk(
  "auth/sendConnectionRequest",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/send_connection_request", {
        token: localStorage.getItem("token"),
        connectionId: user._id,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getConnectionRequests = createAsyncThunk(
  "auth/getConnectionRequests",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/sent_connection_request", {
        params: { token: localStorage.getItem("token") },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getReceivedConnectionRequests = createAsyncThunk(
  "auth/getReceivedConnectionRequests",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/received_connection_request", {
        params: { token: localStorage.getItem("token") },
      });
      return { requests: response.data.connections };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const respondToConnectionRequest = createAsyncThunk(
  "auth/respondToConnectionRequest",
  async ({ requestId, action }, thunkAPI) => {
    try {
      const response = await clientServer.post("/respond_connection_request", {
        token: localStorage.getItem("token"),
        requestId,
        action_type: action,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
