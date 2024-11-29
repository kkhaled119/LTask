import { configureStore } from "@reduxjs/toolkit";
import pricingReducer from "./Slices/PricingReducer";
import authReducer from "./Slices/AuthSlice/AuthReducer";
import freedashboardReducer from "./Slices/DashboardSlice/Free-Dashboard";
import loginReducer from "./Slices/AuthSlice/LoginReducer";
import proDashboardSliceReducer from "./Slices/DashboardSlice/Pro-Dashboard";
import userprofileSliceReducer from "./Slices/UserProfile/UserProfileReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pricing: pricingReducer,
    freedashboard: freedashboardReducer,
    login: loginReducer,
    prodashboard: proDashboardSliceReducer,
    userprofile: userprofileSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["getTasks/rejected"],
      },
    }),
});

export default store;
