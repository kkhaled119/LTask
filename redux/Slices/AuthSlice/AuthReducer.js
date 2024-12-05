import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../constant"; // Ensure this is the correct base API URL

// Async thunk for signing up the user
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APILINK}/auth/users/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // Return the API response
    } catch (error) {
      // Filter error data
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.detail || "An error occurred",
      });
    }
  }
);

// Async thunk for activating the user
export const activateUser = createAsyncThunk(
  "auth/activateUser",
  async ({ uid, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APILINK}/auth/users/activation/`, {
        uid,
        token,
      });
      return response.data; // Return success response
    } catch (error) {
      // Filter error data
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.detail || "Activation failed",
      });
    }
  }
);

// Async thunk for Google authentication
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${APILINK}/users/auth/google/callback/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return user data or JWT from the response
    } catch (error) {
      // Filter error data
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.detail || "Google Authentication failed",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    activationSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign-up user logic
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user data on successful sign-up
        state.error = null; // Clear previous errors
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store filtered error data
      })

      // Activate user logic
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.activationSuccess = false;
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.loading = false;
        state.activationSuccess = true;
        state.error = null; // Clear previous errors
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false;
        state.activationSuccess = false;
        state.error = action.payload; // Store filtered error data
      })

      // Google authentication logic
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store the user data received from Google Auth
        state.error = null; // Clear previous errors
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store filtered error data
      });
  },
});

export default authSlice.reducer;
