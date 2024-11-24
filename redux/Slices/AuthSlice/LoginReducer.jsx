import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../Constants"; // Ensure this is the correct base API URL

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APILINK}/auth/jwt/create/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access, refresh } = response.data;

      // Save tokens in localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      return { access, refresh };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Async thunk for logging out the user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return "Logout successful";
    } catch (error) {
      console.error("Logout Error:", error);
      return rejectWithValue("Logout failed");
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("accessToken"), // True if token exists
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access;
        state.isAuthenticated = true; // Mark user as authenticated
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false; // Reset auth status
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false; // Mark user as not authenticated
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
