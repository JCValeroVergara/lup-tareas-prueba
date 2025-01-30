
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', //checking 'authenticated' or 'not-authenticated'
        uid: null,
        email: null,
        name: null,
        token: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.name = payload.name;
            state.token = payload.token;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.name = null;
            state.token = null;
            state.errorMessage = payload?.errorMessage;
        
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
