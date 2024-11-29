import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../constant";

export const getUserData = createAsyncThunk(
  "userprofile/getuserdata",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/dashboard/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || err.message || "Failed to fetch user data"
      );
    }
  }
);
export const updateUserData = createAsyncThunk(
  "userprofile/updateuserdata",
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${APILINK}/dashboard/users/me/`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated data:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || err.message || "Failed to update user data"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "userprofile",
  initialState: {
    loading: false,
    error: null,
    userData: null, // Store user data
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = { ...state.userData, ...action.payload }; // Merge new data
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
