import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    resetUsername: (state) => {
        state.username = null;
    },
  },
});

export const { setUsername,resetUsername } = userSlice.actions;

export default userSlice.reducer;
