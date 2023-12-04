import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userID: string | null;
  firstName: string | null;
  lastName: string | null; 
}

const initialState: UserState = {
  userID: null,
  firstName: "",
  lastName: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userID = action.payload.userID;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser: (state) => {
      state.userID = null;
      state.firstName = null;
      state.lastName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice;
