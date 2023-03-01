import React from 'react'
import './Avatar.scss'

const Avatar = ({img='', name=''}) => {
  return (
    <div className="avatar">
        {img ? <img src={img} alt=''/> : name.charAt(0)}
    </div>
  )
}

export default Avatar