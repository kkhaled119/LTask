import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../constant";

// Create Task
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "An unknown error occurred.",
        status: err.response?.status,
      });
    }
  }
);

// Get User Tasks
export const getUserTasks = createAsyncThunk(
  "getTasks",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/free_task/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "An unknown error occurred.",
        status: error.response?.status,
      });
    }
  }
);

// Delete User Task
export const deleteUserTask = createAsyncThunk(
  "freedashboard/deleteUserTask",
  async ({ token, selectedTaskId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${APILINK}/free_task/tasks/${selectedTaskId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id: selectedTaskId, status: response.data };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "An unknown error occurred.",
        status: error.response?.status,
      });
    }
  }
);

// Edit User Task
export const editUserTask = createAsyncThunk(
  "freedashboard/editUserTask",
  async ({ token, taskId, updatedTask }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${APILINK}/free_task/tasks/${taskId}/`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id: taskId, updatedTask: response.data };
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "An unknown error occurred.",
        status: err.response?.status,
      });
    }
  }
);

// Slice
const freeDashboardSlice = createSlice({
  name: "freeDashboard",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...state.tasks, action.payload];
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create task.";
      })
      // Get User Tasks
      .addCase(getUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch tasks.";
      })
      // Delete User Task
      .addCase(deleteUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserTask.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== id);
        state.status = action.payload.status;
      })
      .addCase(deleteUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete task.";
      })
      // Edit User Task
      .addCase(editUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserTask.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(editUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to edit task.";
      });
  },
});

export default freeDashboardSlice.reducer;
