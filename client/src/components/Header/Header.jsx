import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../Avatar/Avatar'
import './Header.scss'
import { logout } from '../../redux/actions/userAction'
import {categories} from '../../assets/categories'
import {toast} from 'react-toastify'

const Header = ({ query, setQuery }) => {
    const path = useLocation().pathname;
    const { user } = useSelector(state => state.user);
    const [q, setQ] = useState(query.q);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleQuery = (type, value) => {
        if (type === 'cat') {
            setQuery({ ...query, cat: value });
        } else {
            setQuery({ ...query, q: value });
        }

        if (path === '/' || path === '/me') return;
        navigate('/');
    }

    const dispatch = useDispatch();

    const logoutHandler = async () => {
        const req = await dispatch(logout());
        if (req.message) {
            toast.success(req.message);
            dispatch({ type: 'clearMessage' });
        }
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-left">
                    <Link className='logo' to='/'>Write</Link>

                    <div className="nav-wrapper">
                        <nav>
                            <button
                                className={query.cat === '' ? 'active' : ''}
                                onClick={() => handleQuery('cat', '')}
                            >All</button>
                            {categories.map((cat, i) => (
                                <button
                                    key={i}
                                    className={query.cat === cat.value ? 'active' : ''}
                                    onClick={() => handleQuery('cat', cat.value)}
                                >{cat.label}</button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="header-right">

                    <div className="search">
                        <button type='button'>
                            <span className="material-symbols-rounded">
                                search
                            </span>
                        </button>
                        <input type="text" placeholder='Search' onChange={(e) => setQ(e.target.value)} onKeyDown={e =>( e.key==='Enter' && e.target.value!=='') && handleQuery('q', e.target.value)} />
                        {q !== '' && <div className="clear-btn">×</div>}
                    </div>

                    <Link to='/saved' className='saved-btn'>
                        <span className={`material-symbols-rounded ${path === '/saved' ? 'filled' : ''}`}>
                            bookmarks
                        </span>
                    </Link>

                    <div className="profile">
                        {user ? (
                            <button onClick={() => setShowMenu(!showMenu)}>
                                {user.img ? <Avatar img={user.img.url} /> : <Avatar name={user.name} />}
                            </button>
                        ) : <Link className='login-btn' to='/login'>Login</Link>}

                        {showMenu && <div className="menu-wrapper">
                            <div className="backdrop" onClick={() => setShowMenu(!showMenu)}></div>
                            <div className='menu'>
                                <span onClick={() => setShowMenu(!showMenu)}>
                                    <Link className='item' to='/add'><span className="material-symbols-rounded">
                                        edit
                                    </span>Add</Link>
                                </span>

                                <span onClick={() => setShowMenu(!showMenu)}>
                                    <Link className='item' to='/me'><span className="material-symbols-rounded">
                                        person
                                    </span>Profile</Link>
                                </span>

                                <span onClick={() => setShowMenu(!showMenu)}>
                                    <button className='item' onClick={logoutHandler}><span className="material-symbols-rounded">
                                        logout
                                    </span>Logout</button>
                                </span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header