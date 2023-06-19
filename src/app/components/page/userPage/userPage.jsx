import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
// css
import 'bootstrap/dist/css/bootstrap.css'
import './user.css'
// components
import apiUsers from '../../../api/fake.api/user.api'
import IconSVG from '../../common/iconSVG'

const UserPage = ({ userId }) => {
  const history = useHistory()
  const [selectedUser, setSelectedUser] = useState()
  useEffect(() => {
    apiUsers.getUserById(userId).then((data) => setSelectedUser({ ...data }))
  }, [])
  const backToUsers = () => {
    history.replace('/Users')
  }

  return (
    <>
      {selectedUser ? (
        <div className="user-page">
          <h2 className="user-name">
            <b>{selectedUser.name}</b>
          </h2>
          <h5>
            <b>Email:</b> {selectedUser.email}
          </h5>
          <h5>
            <b>Sex:</b>{' '}
            {selectedUser.sex[0].toUpperCase() + selectedUser.sex.slice(1)}
          </h5>
          <h5>
            <b>Профессия:</b> {selectedUser.profession.name}
          </h5>
          {selectedUser.qualities.map((item) => (
            <h4
              key={item._id}
              className={'badge bg-' + item.color}
              style={{ fontSize: '16px', margin: '5px 0 10px' }}
            >
              {item.name}
            </h4>
          ))}
          <h5>
            <b>Completed Meetings:</b> {selectedUser.completedMeetings}
          </h5>
          <h5>
            <b>Rate:</b> {selectedUser.rate}
          </h5>
          <h5>
            <b>Bookmark:</b>{' '}
            {selectedUser.bookmark ? (
              <i
                style={{ fontSize: '20px' }}
                className="bi bi-bookmark-star-fill"
              ></i>
            ) : (
              <i style={{ fontSize: '20px' }} className="bi bi-bookmark"></i>
            )}
          </h5>
          <button
            className="btn btn-secondary btnBackMarginRight"
            onClick={backToUsers}
          >
            Back to Users
          </button>
          <Link className="btn btn-warning" to={`${userId}/edit`}>
            Edit user
          </Link>
        </div>
      ) : (
        <IconSVG id={'loader'} />
      )}
    </>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
