import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice/AuthReducer';
import pricingReducer from './Slices/PricingReducer';
import loginReducer from './Slices/AuthSlice/LoginReducer';
import freedashboardReducer from './Slices/DashboardSlice/Free-Dashboard/FreeDashboardReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,  
    login : loginReducer,
    pricing: pricingReducer,
    freedashboard:freedashboardReducer,
  },
});

export default store;
