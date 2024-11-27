import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import APILINK from "../../../../Constants"; // Ensure this is the correct base API URL

// Async thunk for signing up the user
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (formData, { rejectWithValue }) => {
    try {
      // console.log("Data from AuthReducer", formData);
      const response = await axios.post(`${APILINK}/auth/users/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // Return the API response
    } catch (error) {
      return rejectWithValue(error.response); // Handle error and reject with value
    }
  }
);
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
      return rejectWithValue(error.response.data); // Return error response
    }
  }
);
// Async thunk for Google authentication
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Calling API for Google Authentication...");
      const response = await axios.get(`${APILINK}/users/auth/google/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("Google Auth Response:", response.data);
      return response.data; // Return user data or JWT from the response
    } catch (error) {
      console.log("Google Auth Error:", error);
      return rejectWithValue(error.response); // Handle error and reject with value
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
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Activate user logic (this is where you handle the activation)
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.activationSuccess = false;
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.loading = false;
        state.activationSuccess = true;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Google authentication logic
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store the user data received from Google Auth
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle any errors
      });
  },
});

export default authSlice.reducer;
