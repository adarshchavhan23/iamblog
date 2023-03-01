import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllPosts } from '../../redux/actions/postAction';
import Post from './Post/Post';
import './Home.scss'
import Pagination from '../../components/Pagination/Pagination';

const Home = ({ query }) => {

    const { loading, posts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        dispatch(getAllPosts(query.q, query.cat, pageSize, page))
        .then((res)=>{
            if(res.type === 'getAllPostsSuccess'){
                setTotalPages(res.total);
            }
        })
    }, [query, pageSize, page])

    return loading!==false ? (
        <div className="main-loader"></div>
    ) : posts && (
        <div className="home">
            <div className="posts">
                {posts.length <= 0 ? <p className='msg'>No post yet.</p> : posts.map((post, i) => <Post key={i} {...{ post, query }} />)}
            </div>
            {posts.length >= pageSize && <Pagination {...{page, setPage, totalPages, setPageSize}}/>}
        </div>
    )
}

export default Home