import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserData, logOut } from '../../store/users'
import IconSVG from '../common/iconSVG'

const NavProfile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const currentUser = useSelector(getCurrentUserData())
  const dispatch = useDispatch()

  const logoutUser = () => {
    dispatch(logOut())
  }
  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  if (!currentUser) return <IconSVG id={'loader'}/>

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
        <button onClick={logoutUser} className='dropdown-item'>Log Out</button>
      </div>
    </div>
  )
}

export default NavProfile
