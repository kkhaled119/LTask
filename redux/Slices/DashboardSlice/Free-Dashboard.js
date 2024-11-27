import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../../constant";

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
            Authorization: `Bearer ${token}`,
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
// get all tasks made by a specific user "Not an Id " it retrive by token
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
      return rejectWithValue(error);
    }
  }
);
//delete Task By the user
export const deleteUserTask = createAsyncThunk(
  "freedashboard/deleteUserTask",
  async ({ token, selectedTaskId }, { rejectWithValue }) => {
    try {
      // console.log(token);

      const response = await axios.delete(
        `${APILINK}/free_task/tasks/${selectedTaskId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
      return rejectWithValue(err.response?.data);
    }
  }
);

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
      //Edit User Task
      .addCase(editUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserTask.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          state.tasks[index] = updatedTask; // Update only the modified task
        }
      })
      .addCase(editUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Get User Tasks
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
        state.error = action.payload;
      })
      //delete User Task
      .addCase(deleteUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserTask.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(deleteUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default freeDashboardSlice.reducer;
