import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMesage: undefined
    },
    reducers: {
       onChecking: (state) => {
            state.status = 'checking';
            state.user = {},
            state.errorMesage = undefined
       },
       onLogin: ( state, { payload} ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMesage = undefined
       },
       onLogout: ( state, {payload} ) => {
        state.status = 'not-authenticated';
        state.user = {};
        state.errorMesage = payload
       },
       clearErrorMessage: ( state ) => {
            state.errorMesage = undefined
       }
    }
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;