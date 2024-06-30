import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import channelReducer from '../features/user/channelSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        channels: channelReducer,
    },
});

export default store;