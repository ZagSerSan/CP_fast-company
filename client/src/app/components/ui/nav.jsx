import React from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
import NavProfile from './navProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const Nav = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())

  return (
    <nav className="navbar bg-light mb-2">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" exact="true" to="/">
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          )}
          
        </ul>
        <div className="d-flex">
          {isLoggedIn
          ? <NavProfile/>
          : <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          }
        </div>
      </div>
    </nav>
  )
}

export default Nav
