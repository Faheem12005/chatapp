import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

const userStore = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default userStore;