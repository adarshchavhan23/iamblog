import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    savedPosts: []
}

export const postReducer = createReducer(initialState, {
    getAllPostsRequest: (state) => {
        state.loading = true;
    },
    getAllPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.total = action.total;
    },
    getAllPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    getMyPostsRequest: (state) => {
        state.loading = true;
    },
    getMyPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.total = action.total;
    },
    getMyPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    getUserPostsRequest: (state) => {
        state.loading = true;
    },
    getUserPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.total = action.total;
    },
    getUserPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    getSavedPostsRequest: (state) => {
        state.loading = false;
    },
    getSavedPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getSavedPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    createPostRequest: (state) => {
        state.loading = true;
    },
    createPostSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.message = action.message;
    },
    createPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    getPostRequest: (state) => {
        state.loading = true;
    },
    getPostSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
    },
    getPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    updatePostRequest: (state) => {
        state.loading = true;
    },
    updatePostSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.message = action.message;
    },
    updatePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    deletePostRequest: (state) => {
        state.loading = false;
    },
    deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    deletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    likePostRequest: (state) => {
        state.loading = false;
    },
    likePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    likePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    commentPostRequest: (state) => {
        state.loading = false;
    },
    commentPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    commentPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    deleteCommentRequest: (state) => {
        state.loading = false;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    deleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    savePostRequest: (state) => {
        state.loading = false;
    },
    savePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.message;
    },
    savePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.error; 
    },

    defaultError: (state, action) => {
        state.loading = false;
        state.error =  'internal server error';
    },
    clearMessage: (state) => {
        state.message = null;
        state.error = null;
    }
});