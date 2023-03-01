import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import { getAllPosts, getSavedPosts, savePost } from '../../../redux/actions/postAction'
import './Post.scss'


const Post = ({ post, query }) => {
    const { user } = useSelector(state => state.user);
    const [saved, setSaved] = useState(false);
    const path = useLocation().pathname;

    const dispatch = useDispatch();

    const handleSavePost = async () => {
        setSaved(!saved);
        await dispatch(savePost(post._id));
        if (path === '/') {
            dispatch(getAllPosts(query.q, query.cat));
        } else if (path === '/saved') {
            dispatch(getSavedPosts());
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
        <div className="home-post">
            {post.img && <div className="img">
                <img src={post.img.url} alt='' />
                <div className="category">{post.cat}</div>
            </div>}
            <div className="content">
                <div className="details">
                    <div className="user">
                        <div className="avatar">
                            {post.author.img ? <img src={post.author.img.url} /> : post.author.name[0]}
                        </div>
                        <div>
                            <span className="name">{post.author.name}</span>
                            <Link to={`/c/${post.author.handle}`} className="handle">@{post.author.handle}</Link>
                        </div>
                        <div>
                            <span className='time'><ReactTimeAgo date={new Date(post.createdAt)} /></span>
                        </div>
                    </div>
                    <div>
                        {!post.img && <div className="category">{post.cat}</div>}
                        <button onClick={handleSavePost}>
                            {saved || path === '/saved' ? <span className="material-symbols-rounded filled">
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
        </div>
    )
}

export default Post