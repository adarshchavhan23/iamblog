import axios from 'axios'
import { rootUrl } from '../store';

export const getAllPosts = (q='', cat='', pageSize, page) => async(dispatch) => {
    try {
        dispatch({type: 'getAllPostsRequest'});

        const {data} = await axios.get(`${rootUrl}/api/posts?q=${q}&cat=${cat}&pageSize=${pageSize}&page=${page}`);
        
        if(data.code === 200){
            return dispatch({type: 'getAllPostsSuccess', payload: data.posts, total:data.totalPages})
        }else{
            return dispatch({type: 'getAllPostsFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const getMyPosts = (q='', cat='', pageSize, page) => async(dispatch) => {
    try {
        dispatch({type: 'getMyPostsRequest'});

        const {data} = await axios.get(`${rootUrl}/api/me/posts?q=${q}&cat=${cat}&pageSize=${pageSize}&page=${page}`);
        
        if(data.code === 200){
            return dispatch({type: 'getMyPostsSuccess', payload: data.posts, total:data.totalPages})
        }else{
            return dispatch({type: 'getMyPostsFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const getUserPosts = (handle, q='', cat='', pageSize, page) => async(dispatch) => {
    try {
        dispatch({type: 'getUserPostsRequest'});

        const {data} = await axios.get(`${rootUrl}/api/@${handle}/posts?q=${q}&cat=${cat}&pageSize=${pageSize}&page=${page}`);
        
        if(data.code === 200){
            return dispatch({type: 'getUserPostsSuccess', payload: data.posts, total:data.totalPages})
        }else{
            return  dispatch({type: 'getUserPostsFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const getSavedPosts = (q='', cat='') => async(dispatch) => {
    try {
        dispatch({type: 'getSavedPostsRequest'});

        const {data} = await axios.get(`${rootUrl}/api/saved/posts?q=${q}&cat=${cat}`);
        
        if(data.code === 200){
            dispatch({type: 'getSavedPostsSuccess', payload: data.posts})
        }else{
            dispatch({type: 'getSavedPostsFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const createPost = (postData) => async(dispatch) => {
    try {
        dispatch({type: 'createPostRequest'});

        const {data} = await axios.post(`${rootUrl}/api/posts`, postData);
        
        if(data.code === 200){
            return dispatch({type: 'createPostSuccess', payload: data.post, message: data.message})
        }else{
            return dispatch({type: 'createPostFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const getPost = (postId) => async(dispatch) => {
    try {
        dispatch({type: 'getPostRequest'});

        const {data} = await axios.get(`${rootUrl}/api/posts/${postId}`);
        
        if(data.code === 200){
            dispatch({type: 'getPostSuccess', payload: data.post})
        }else{
            dispatch({type: 'getPostFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const updatePost = (postId, postData) => async(dispatch) => {
    try {
        dispatch({type: 'updatePostRequest'});

        const {data} = await axios.put(`${rootUrl}/api/posts/${postId}`, postData);
        
        if(data.code === 200){
            return dispatch({type: 'updatePostSuccess', payload: data.post, message: data.message})
        }else{
            return dispatch({type: 'updatePostFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError', error})
    }
}

export const deletePost = (postId) => async(dispatch) => {
    try {
        dispatch({type: 'deletePostRequest'});

        const {data} = await axios.delete(`${rootUrl}/api/posts/${postId}`);
        
        if(data.code === 200){
            return dispatch({type: 'deletePostSuccess', message: data.message})
        }else{
            return dispatch({type: 'deletePostFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const likePost = (postId) => async(dispatch) => {
    try {
        dispatch({type: 'likePostRequest'});

        const {data} = await axios.put(`${rootUrl}/api/posts/${postId}/like`);
        
        if(data.code === 200){
            dispatch({type: 'likePostSuccess', message: data.message})
        }else{
            dispatch({type: 'likePostFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const commentPost = (postId, commentData) => async(dispatch) => {
    try {
        dispatch({type: 'commentPostRequest'});

        const {data} = await axios.put(`${rootUrl}/api/posts/${postId}/comment`, commentData);
        
        if(data.code === 200){
            dispatch({type: 'commentPostSuccess', message: data.message})
        }else{
            dispatch({type: 'commentPostFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const deleteComment = (postId) => async(dispatch) => {
    try {
        dispatch({type: 'deleteCommentRequest'});

        const {data} = await axios.delete(`${rootUrl}/api/posts/${postId}/comment`);
        
        if(data.code === 200){
            dispatch({type: 'deleteCommentSuccess', message: data.message})
        }else{
            dispatch({type: 'deleteCommentFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}

export const savePost = (postId) => async(dispatch) => {
    try {
        dispatch({type: 'savePostRequest'});

        const {data} = await axios.put(`${rootUrl}/api/posts/${postId}/save`);
        
        if(data.code === 200){
            dispatch({type: 'savePostSuccess', message: data.message})
        }else{
            dispatch({type: 'savePostFailure', error: data.message})
        }

    } catch (error) {
        dispatch({type: 'defaultError'})
    }
}