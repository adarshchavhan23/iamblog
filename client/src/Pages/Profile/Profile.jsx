import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import UpdatePassword from '../../components/UpdateProfile/UpdatePassword';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import { getMyPosts, getUserPosts } from '../../redux/actions/postAction';
import { loadUser } from '../../redux/actions/userAction';
import Post from './Post/Post';
import './Profile.scss'

const Profile = ({ query, isAccount = false }) => {
    const { user } = useSelector(state => state.user);
    const { posts, loading } = useSelector(state => state.post);
    const params = useParams();
    const dispatch = useDispatch();

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    const handleUpdateProfile = () => {
        setShowUpdateProfile(!showUpdateProfile);
    }

    const handleUpdatePassword = () => {
        setShowUpdatePassword(!showUpdatePassword);
    }

    const { q, cat } = query;

    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(loadUser());
        if (isAccount) {
            dispatch(getMyPosts(q, cat, pageSize, page))
            .then((res)=>{
                if(res.type === 'getMyPostsSuccess'){
                    setTotalPages(res.total);
                }
            })
        } else {
            dispatch(getUserPosts(params.handle, q, cat, pageSize, page))
            .then((res)=>{
                if(res.type === 'getUserPostsSuccess'){
                    setTotalPages(res.total);
                }
            })
        }
    }, [query, pageSize, page])

    return user && (
        <div className="profile">
            <div className="container">
                <div className="main-menu">
                    <h1>My Posts</h1>
                    {loading!==false ?
        <div className="main-loader"></div> : <div className="posts">
                        {posts.length <= 0 ? <p className='msg'>No post yet.</p> : posts.map(post => <Post key={post._id} isAccount={isAccount} post={post} />)}
                    </div>}
                    {posts.length >= pageSize && <Pagination {...{page, setPage, totalPages, setPageSize}}/>}
                </div>
                <div className="side-menu">
                    <div className="user">
                        <div className="avatar">
                            {user.img ? <img src={user.img.url} /> : user.name[0]}
                        </div>
                        <h2 className="name">{user.name}</h2>
                        <h3 className="handle">@{user.handle}</h3>
                        <a className='mail-btn' href={`mailto:${user.email}`}>
                            <span className="material-symbols-rounded filled">
                                mail
                            </span>
                        </a>
                    </div>

                    {isAccount && <div className="actions">
                        <button onClick={handleUpdateProfile}>Update Profile</button>
                        <button onClick={handleUpdatePassword}>Update Password</button>
                    </div>}
                </div>
            </div>
            {showUpdateProfile && <UpdateProfile {...{ user, handleUpdateProfile }} />}
            {showUpdatePassword && <UpdatePassword {...{ handleUpdatePassword }} />}
        </div>
    )
}

export default Profile