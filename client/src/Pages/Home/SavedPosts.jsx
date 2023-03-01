import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { getSavedPosts } from '../../redux/actions/postAction';
import Post from './Post/Post';
import './Home.scss'

const SavedPosts = () => {
    const {posts} = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getSavedPosts());
    },[])

    return posts && (
        <div className="home">
            <h2 className="heading">Saved Post</h2>
            <div className="posts">
                {posts.length <= 0 ? <p className='msg'>No post yet.</p> : posts.map((post, i) => <Post key={i} {...{post, query:{q:'',cat:''}}}/>)}
            </div>
        </div>
      )
}

export default SavedPosts