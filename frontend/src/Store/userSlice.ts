import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userID: string | null;
}

const initialState: UserState = {
  userID: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userID = action.payload;
    },
    clearUser: (state) => {
      state.userID = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice;
