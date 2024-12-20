import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import APILINK from "../../constant";

// Async thunk for fetching pricing data
export const fetchPricingData = createAsyncThunk(
  "pricing/fetchPricingData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APILINK}/plans/plan_list/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPricingData.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPricingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pricingSlice.reducer;
