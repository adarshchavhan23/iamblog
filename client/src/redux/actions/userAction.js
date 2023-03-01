import axios from 'axios';
import { rootUrl } from '../store';

export const signup = (userData) => async(dispatch) => {
    dispatch({type:'signupRequest'});
    try {
        const {data} = await axios.post(`${rootUrl}/api/signup`, userData);
        
        if(data.code === 200) {
            return dispatch({type:'signupSuccess', payload:data.user, message: data.message})
        }else{
            return dispatch({type:'signupFailure', error: data.message});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}

export const login = (userData) => async(dispatch) => {
    dispatch({type:'loginRequest'});
    try {
        const {data} = await axios.post(`${rootUrl}/api/login`, userData);
        
        if(data.code === 200) {
            return dispatch({type:'loginSuccess', payload:data.user, message: data.message})
        }else{
            return dispatch({type:'loginFailure', error: data.message});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}

export const logout = () => async(dispatch) => {
    dispatch({type:'logoutRequest'});
    try {
        const {data} = await axios.get(`${rootUrl}/api/logout`, userData);
        
        if(data.code === 200) {
            return dispatch({type:'logoutSuccess', message: data.message})
        }else{
            return dispatch({type:'logoutFailure', error: data.message});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}

export const loadUser = () => async(dispatch) => {
    dispatch({type:'loadUserRequest'});
    try {
        const {data} = await axios.get(`${rootUrl}/api/me`, {
            withCredentials: true
        });
        
        await axios.get(`${rootUrl}/api/me`).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })

        if(data.code === 200) {
            dispatch({type:'loadUserSuccess', payload:data.user})
        }else{
            dispatch({type:'loadUserFailure'});
        }

    } catch (error) {
        dispatch({type: 'defaultError', error:error});
    }
}

export const getUser = (handle) => async(dispatch) => {
    dispatch({type:'getUserRequest'});
    try {
        const {data} = await axios.get(`${rootUrl}/api/@${handle}`, userData);
        
        if(data.code === 200) {
            dispatch({type:'getUserSuccess', payload:data.user})
        }else{
            dispatch({type:'getUserFailure',});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}

export const updateProfile = (userData) => async(dispatch) => {
    dispatch({type:'updateProfileRequest'});
    try {
        const {data} = await axios.put(`${rootUrl}/api/me`, userData);
        
        if(data.code === 200) {
            return dispatch({type:'updateProfileSuccess', message: data.message})
        }else{
            return dispatch({type:'updateProfileFailure', error: data.message});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}

export const updatePassword = (passwordData) => async(dispatch) => {
    dispatch({type:'updatePasswordRequest'});
    try {
        const {data} = await axios.put(`${rootUrl}/api/password`, passwordDatauserData);
        
        if(data.code === 200) {
            return dispatch({type:'updatePasswordSuccess', message: data.message})
        }else{
            return dispatch({type:'updatePasswordFailure', error: data.message});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}



export const forgetPassword = (email) => async(dispatch) => {

    dispatch({type:'forgetPasswordRequest'});
    try {
        const {data} = await axios.put(`${rootUrl}/api/password/forget`, emailuserData);
        
        if(data.code === 200) {
            return dispatch({type:'forgetPasswordSuccess', message: data.message})
        }else{
            return dispatch({type:'forgetPasswordFailure', error: data.message});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}

export const resetPassword = (passwordData, token) => async(dispatch) => {
    dispatch({type:'resetPasswordRequest'});
    try {
        const {data} = await axios.put(`${rootUrl}/api/password/reset/${token}`, passwordDatauserData);
        
        if(data.code === 200) {
            return dispatch({type:'resetPasswordSuccess', message: data.message})
        }else{
            return dispatch({type:'resetPasswordFailure', error: data.message});
        }

    } catch (error) {
        dispatch({type: 'defaultError'});
    }
}