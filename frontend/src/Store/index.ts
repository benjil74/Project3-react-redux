import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    admin: adminSlice.reducer,
    user: userSlice.reducer
  },
});
export default store;

