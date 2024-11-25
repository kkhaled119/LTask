import { configureStore } from "@reduxjs/toolkit";
import pricingReducer from "./Slices/PricingReducer";

const store = configureStore({
  reducer: {
    pricing: pricingReducer,
  },
});

export default store;
