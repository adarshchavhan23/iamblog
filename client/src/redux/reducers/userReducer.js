import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const userReducer = createReducer(initialState, {
    signupRequest: (state) => {
        state.loading = true;
    },
    signupSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.message;
        state.isAuth = true;
    },
    signupFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.isAuth = false;
    },

    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.message;
        state.isAuth = true;
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.isAuth = false;
    },

    
    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.user = null;
        state.message = action.message;
        state.isAuth = false;
    },
    logoutFailure: (state, action) => {
        state.loading = false;
        state.isAuth = true;
    },

    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.isAuth = false;
    },

    getUserRequest: (state) => {
        state.loading = true;
    },
    getUserSuccess: (state, action) => {
        state.loading = false;
        state.author = action.payload;
    },
    getUserFailure: (state, action) => {
        state.loading = false;
    },

    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },

    updatePasswordRequest: (state) => {
        state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    updatePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },

    forgetPasswordRequest: (state) => {
        state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    forgetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },

    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },

    defaultError: (state, action) => {
        state.error = 'Internal Server error';
    },
    clearMessage: (state) => {
        state.message = null;
        state.error = null;
    }
}); 