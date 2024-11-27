import { configureStore } from "@reduxjs/toolkit";
import pricingReducer from "./Slices/PricingReducer";
import authReducer from "./Slices/AuthSlice/AuthReducer";
import freedashboardReducer from "./Slices/DashboardSlice/Free-Dashboard";
import loginReducer from "./Slices/AuthSlice/LoginReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pricing: pricingReducer,
    freedashboard: freedashboardReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "getTasks/rejected", // استبدل بـ الأكشن الخاص بك
          // أضف المزيد من الأكشنات هنا إذا كان لديك
        ],
      },
    }),
});

export default store;
