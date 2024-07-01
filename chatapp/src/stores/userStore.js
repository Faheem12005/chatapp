import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import channelReducer from '../features/user/channelSlice';
import currentChannelReducer from '../features/user/currentChannelSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        channels: channelReducer,
        currentChannel: currentChannelReducer,
    },
});

export default store;