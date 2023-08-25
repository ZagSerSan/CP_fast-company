import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserData } from '../../store/users'
import IconSVG from '../common/iconSVG'

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData())
  const {logOut} = useAuth()

  if (!currentUser) return <IconSVG id={'loader'}/>
  
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.avatar}
          className="img-responsive rounded-circle"
          height='40'
          alt="avatar"
        />
      </div>
      <div className={`w-100 dropdown-menu` + (isOpen ? ' show' : '')}>
        <Link to={`/users/${currentUser._id}`} className='dropdown-item'>Profile</Link>
        <button onClick={logOut} className='dropdown-item'>Log Out</button>
      </div>
    </div>
  )
}

export default NavProfile
