import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// css
import 'bootstrap/dist/css/bootstrap.css'
import './css/user.css'
// components
import apiUsers from '../../../api/fake.api/user.api'
import IconSVG from '../../common/iconSVG'

const User = ({ userId }) => {
  const [selectedUser, setSelectedUser] = useState()
  useEffect(() => {
    apiUsers.getUserById(userId).then((data) => setSelectedUser(...data))
  }, [])

  return (
    <>
      {selectedUser ? (
        <div className="user-page">
          <h2>{selectedUser.name}</h2>
          <h4>Профессия: {selectedUser.profession.name}</h4>
          {selectedUser.qualities.map((item) => (
            <h4 key={item._id} className={'badge bg-' + item.color + ' m-1'}>
              {item.name}
            </h4>
          ))}
          <h5>Completed Meetings: {selectedUser.completedMeetings}</h5>
          <h5>Rate: {selectedUser.rate}</h5>
          <Link className="btn btn-secondary" to="/Users">
            Back to all users
          </Link>
        </div>
      ) : (
        <IconSVG id={'loader'} />
      )}
    </>
  )
}

User.propTypes = {
  userId: PropTypes.string.isRequired
}

export default User
