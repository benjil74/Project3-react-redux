import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  isAdmin: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin(state) {
      state.isAdmin = true;
    },
    adminLogout(state) {
      state.isAdmin = false;
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice;
