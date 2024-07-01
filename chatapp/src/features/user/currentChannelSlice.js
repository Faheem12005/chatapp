import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channel: null,
};

const currentChannelSlice= createSlice({
    name: "currentChannel",
    initialState,
    reducers: {
        setCurrentChannel: (state,action) => {
            state.channel = action.payload; 
        }
    },
});

export const { setCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;