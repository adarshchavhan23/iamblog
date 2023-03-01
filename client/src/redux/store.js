import {configureStore} from '@reduxjs/toolkit';
import { postReducer } from './reducers/postReducer';
import { userReducer } from './reducers/userReducer';

export default configureStore({
    reducer:{
        user: userReducer,
        post: postReducer
    }
});

export const rootUrl = import.meta.env.VITE_ROOT_URL;