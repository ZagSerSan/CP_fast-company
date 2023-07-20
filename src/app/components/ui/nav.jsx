import React from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Nav = () => {
  const {currentUser} = useAuth()
  console.log(currentUser)

  return (
    <nav className="navbar bg-light mb-2">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" exact="true" to="/">
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/Users">
                Users
              </Link>
            </li>
          )}
          
        </ul>
        <div className="d-flex">
          {currentUser
          ? <h4>User</h4>
          : <li className="nav-item">
              <Link className="nav-link" to="/Login">
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
