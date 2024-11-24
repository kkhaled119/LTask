import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../../../Constants";

// Create a new Task (Post to the database)
export const createTask = createAsyncThunk(
  "freedashboard/createTask",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APILINK}/free_task/tasks/create/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Bearer prefix for tokens
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Task creation error:", err.response?.data);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getUserTasks = createAsyncThunk(
  "getTasks",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/free_task/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const freeDashboardSlice = createSlice({
  name: "freeDashboard",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Add the created task to the tasks list
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })

      //Get User Tasks
      .addCase(getUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTasks.fulfilled,(state,action)=>{
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getUserTasks.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default freeDashboardSlice.reducer;
