
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    deleteChannel: (state,action) => {
      state.channels = state.channels.filter(channel => channel.id !== action.payload)
    }
  },
});

export const { setChannels,deleteChannel } = channelSlice.actions;
export default channelSlice.reducer;
