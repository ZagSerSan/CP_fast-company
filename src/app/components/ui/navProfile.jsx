import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const NavProfile = () => {
  const {currentUser} = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`}
          className="img-responsive rounded-circle"
          height='40'
          alt="avatar"
        />
      </div>
      <div className={`w-100 dropdown-menu` + (isOpen ? ' show' : '')}>
        <Link to={`/users/${currentUser._id}`} className='dropdown-item'>Profile</Link>
        <Link to='loguot' className='dropdown-item'>Log Out</Link>
      </div>
    </div>
  )
}

export default NavProfile
