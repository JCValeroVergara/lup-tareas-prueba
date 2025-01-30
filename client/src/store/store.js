import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { taskSlice } from './taks/taskSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        task: taskSlice.reducer,
    },
});