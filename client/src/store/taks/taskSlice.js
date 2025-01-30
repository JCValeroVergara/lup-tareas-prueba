import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );
            state.loading = false;
            state.error = null;
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearTasksLogout: (state) => {
            state.tasks = [];
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setTasks, addTask, updateTask, removeTask, setLoading, setError, clearTasksLogout } = taskSlice.actions;
