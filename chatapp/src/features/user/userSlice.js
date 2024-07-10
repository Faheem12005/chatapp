import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
        state.user = null;
    },
  },
});

export const { setUser,resetUser } = userSlice.actions;

export default userSlice.reducer;
