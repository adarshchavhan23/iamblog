import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <Link className='logo' to='/'>Write</Link>
            <p>Made with 🤍 by Adarsh</p>
        </div>
    </footer>
  )
}

export default Footer