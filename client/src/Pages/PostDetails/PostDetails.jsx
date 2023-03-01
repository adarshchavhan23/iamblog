import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { commentPost, deleteComment, getPost, likePost, savePost } from '../../redux/actions/postAction';
import './PostDetails.scss'

const PostDetails = () => {
    const { post, loading } = useSelector(state => state.post);
    const { user } = useSelector(state => state.user);
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);
    const [commentVal, setCommentVal] = useState('');

    const params = useParams();
    const dispatch = useDispatch();

    const handleSavePost = () => {
        dispatch(savePost(post._id));
        setSaved(!saved);
    }

    const handleLikePost = async () => {
        await dispatch(likePost(post._id));
        dispatch(getPost(post._id));
        setLiked(!liked);
    }

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (commentVal.length > 2) {
            await dispatch(commentPost(post._id, { comment: commentVal }));
            dispatch(getPost(post._id));
            setCommentVal('');
        }
    }

    const handleDeleteComment = async () => {
        if (confirm('Are you sure delete this comment')) {
            await dispatch(deleteComment(post._id));
            dispatch(getPost(post._id));
        }
    }

    useEffect(() => {
        dispatch(getPost(params.id));
    }, [])

    useEffect(() => {
        if (user && post) {
            if (user.saved.includes(post._id)) {
                setSaved(true);
            }
            if (post.likes.includes(user._id)) {
                setLiked(true);
            }
        }
    }, [user, post]);


    return (post) && (
        <div className="post-details">
            <div className="container">
                
                {post.img && <div className="img">
                    <img src={post.img.url} alt='' />
                    <div className="category">{post.cat}</div>
                </div>}

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

                        <button onClick={handleLikePost}>
                            {liked ? <span className="material-symbols-rounded filled">
                                thumb_up
                            </span> : <span className="material-symbols-rounded">
                                thumb_up
                            </span>}
                        </button>

                        <button onClick={handleSavePost}>
                            {saved ? <span className="material-symbols-rounded filled">
                                bookmark_remove
                            </span> : <span className="material-symbols-rounded">
                                bookmark_add
                            </span>}
                        </button>
                    </div>
                </div>

                <h2 className="title">{post.title}</h2>
                <p className="brief">"{post.brief}"</p>

                <hr className="divder" />

                <div className='desc' dangerouslySetInnerHTML={{ __html: post.desc }}></div>

                <div className="likes-container">
                    <button onClick={handleLikePost}>
                        <span>{post.likes.length}</span>
                        {liked ? <span className="material-symbols-rounded filled">
                            thumb_up
                        </span> : <span className="material-symbols-rounded">
                            thumb_up
                        </span>}
                    </button>
                </div>

                {post.tags.length > 0 && <div className="tags-container">
                    <h2>Keywords:</h2>
                    <div className="tags">
                        {post.tags.map((item, i) => (
                            <div className="tag" key={i}>{item}</div>
                        ))}
                    </div>
                </div>}

                <div className="comments-container">

                    <h2>Comments</h2>
                    <hr className="divider" />

                    <form onSubmit={handleAddComment} className='comment-form'>
                        <input type="text" placeholder='Comment here..' value={commentVal} onChange={e => setCommentVal(e.target.value)} />
                        <button type='submit'>Add</button>
                    </form>

                    <div className="comments">
                        {post.comments.length <= 0 ? (
                            <p className='msg'>No comment yet.</p>
                        ) : post.comments.map(item => (
                            <div className='comment' key={item._id}>
                                <div className="details">
                                    <div className="user">
                                        <div className="avatar">
                                            {item.user.img ? <img src={item.user.img.url} /> : item.user.name[0]}
                                        </div>
                                        <div>
                                            <span className="name">{item.user.name}</span>
                                        </div>
                                        <div>
                                            <span className='time'><ReactTimeAgo date={new Date(item.createdAt)} /></span>
                                        </div>
                                    </div>
                                    {item.user._id === user._id && <div>
                                        <button onClick={handleDeleteComment}><span className="material-symbols-rounded">
                                            delete
                                        </span></button>
                                    </div>}
                                </div>
                                <p className="comment-msg">{item.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails