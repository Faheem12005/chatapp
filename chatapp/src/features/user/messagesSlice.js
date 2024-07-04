import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessages: (state,action) => {
            state.messages.push(action.payload);
        },
        resetMessages: (state) => {
            state.messages = [];
        },
        setMessages: (state,action) => {
            state.messages = action.payload;
        }
    }
});

export const { addMessages,resetMessages,setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;