import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../constant";

// Thunk actions
export const addPrompt = createAsyncThunk(
  "proDashboard/addPrompt",
  async ({ token, prompt }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APILINK}/ai_task/generate/`,
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Assumes the response contains `chatbot_response` and `tasks`
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to submit prompt"
      );
    }
  }
);

// Slice
const proDashboardSlice = createSlice({
  name: "proDashboard",
  initialState: {
    loading: false,
    error: null,
    tasks: [],
    status: "",
    chatbotResponse: "", // New field for AI chatbot response
  },

  reducers: {
    resetState: (state) => {
      state.tasks = [];
      state.status = "";
      state.error = null;
      state.loading = false;
      state.chatbotResponse = ""; // Reset chatbot response
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.status =
          action.payload.message || "Prompt submitted successfully";
        state.chatbotResponse = action.payload.chatbot_response || ""; // Update chatbot response
        state.tasks = action.payload.tasks || []; // Update tasks correctly
      })
      .addCase(addPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetState } = proDashboardSlice.actions;
export default proDashboardSlice.reducer;
