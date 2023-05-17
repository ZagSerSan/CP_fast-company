import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" exact="true" to='/'>Main</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/Login'>Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/Users'>Users</Link>
      </li>
    </ul>
  )
}
 
export default Nav