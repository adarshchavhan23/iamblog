import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import { toast } from 'react-toastify'
import UpdatePost from '../../../components/UpdatePost/UpdatePost'
import { deletePost, getMyPosts, savePost } from '../../../redux/actions/postAction'
import { loadUser } from '../../../redux/actions/userAction'
import './Post.scss'


const Post = ({ post, isAccount }) => {
    const { user } = useSelector(state => state.user);
    const [saved, setSaved] = useState(false);

    const [showPostUpdate, setShowPostUpdate] = useState(false);
    const handlePostUpdate = () => {
        setShowPostUpdate(!showPostUpdate);
    }

    const dispatch = useDispatch();

    const handleSavePost = () => {
        dispatch(savePost(post._id));
        dispatch(loadUser());
        setSaved(!saved);
    }

    const handleDeletePost = async () => {
        if (confirm('Are you sure delete this post.')) {
            dispatch(deletePost(post._id))
                .then((res) => {
                    if (res.type === 'deletePostSuccess') {
                        toast.success(res.message);
                        dispatch(getMyPosts());
                    }
                })
        }

    }

    useEffect(() => {
        if (user) {
            user.saved.map((item) => {
                if (item === post._id) {
                    setSaved(true);
                }
            })
        }
    }, [user]);


    return (
        <div className="post">
            {post.img && <div className="img">
                <img src={post.img.url} alt='' />
                <div className="category">{post.cat}</div>
            </div>}
            <div className="content">
                <div className="details">
                    <div className="user">
                        <div>
                            <span className='time'>Posted <ReactTimeAgo date={new Date(post.createdAt)} /></span>
                        </div>
                    </div>
                    <div>
                        {!post.img && <div className="category">{post.cat}</div>}
                        {isAccount && <>
                            <button onClick={handlePostUpdate}>
                                <span className="material-symbols-rounded">
                                    edit
                                </span>
                            </button>
                            <button onClick={handleDeletePost}>
                                <span className="material-symbols-rounded">
                                    delete
                                </span>
                            </button>
                        </>}
                        <button onClick={handleSavePost}>
                            {saved ? <span className="material-symbols-rounded filled">
                                bookmark_remove
                            </span> : <span className="material-symbols-rounded">
                                bookmark_add
                            </span>}
                        </button>
                    </div>
                </div>
                <Link to={`/posts/${post._id}`}><h2 className="title">{post.title}</h2></Link>
                <p className="brief">{post.brief}</p>
                <Link to={`/posts/${post._id}`} className='read-btn'>..Read More</Link>
            </div>

            <>
                {showPostUpdate && <UpdatePost {...{ post, handlePostUpdate }} />}
            </>
        </div>
    )
}

export default Post