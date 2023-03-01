import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { loadUser } from './redux/actions/userAction';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import SavedPosts from './Pages/Home/SavedPosts';
import PostDetails from './Pages/PostDetails/PostDetails';
import Toastify from './components/Toastify/Toastify';
import Profile from './Pages/Profile/Profile';
import AddPost from './Pages/AddPost/AddPost';
import Login from './Pages/Auth/Login';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import Signup from './Pages/Auth/Signup';
import NoPage from './Pages/NoPage/NoPage';

TimeAgo.addDefaultLocale(en);

const App = () => {
    const [query, setQuery] = useState({ q: '', cat: '' });
    const { isAuth } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [isAuth])
    
    return isAuth !== undefined && (
        <>
            <Header {...{ query, setQuery }} />
            <div className="routes">
                <Routes>
                    <Route path='/' element={<Home {...{ query }} />} />
                    <Route path='/saved' element={!isAuth ? <Navigate to='/login' /> : <SavedPosts />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path='/c/:handle' element={<Profile {...{ query }} />} />
                    <Route path='/me' element={!isAuth ? <Navigate to='/login' /> : <Profile {...{ query, isAccount: true }} />} />
                    <Route path='/add' element={!isAuth ? <Navigate to='/login' /> : <AddPost />} />
                    <Route path='/login' element={isAuth ? <Navigate to='/' /> : <Login />} />
                    <Route path='/signup' element={isAuth ? <Navigate to='/' /> : <Signup />} />
                    <Route path='/password/forget' element={<ForgetPassword />} />
                    <Route path='/password/reset/:token' element={<ResetPassword />} />
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </div>
            <Footer />
            <Toastify />
        </>
    )
}

export default App