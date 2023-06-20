import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom'
// css
import 'bootstrap/dist/css/bootstrap.css'
import './userPage.css'
// components
import apiUsers from '../../../api/fake.api/user.api'
import IconSVG from '../../common/iconSVG'
import CommentsList from './commentsList'

const UserPage = ({ userId }) => {
  // const history = useHistory()
  const [selectedUser, setSelectedUser] = useState()
  useEffect(() => {
    apiUsers.getUserById(userId).then((data) => setSelectedUser({ ...data }))
  }, [])
  // const backToUsers = () => {
  //   history.replace('/Users')
  // }

  return (
    <div className="container">
      {selectedUser ? (
        <div className="row gutters-sm mt-2">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <Link
                  to={`${userId}/edit`}
                  className="position-absolute top-0 end-0 btn btn-light btn-sm"
                  style={{ zIndex: '1' }}
                >
                  <i className="bi bi-gear"></i>
                </Link>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="120"
                    height="120"
                  />
                  <div className="mt-3">
                    <h4>{selectedUser.name}</h4>
                    <p className="text-secondary mb-1">
                      {selectedUser.profession.name}
                    </p>
                    <div className="text-muted">
                      <i
                        className="bi bi-caret-down-fill text-primary"
                        role="button"
                      ></i>
                      <i
                        className="bi bi-caret-up text-secondary"
                        role="button"
                      ></i>
                      <span className="ms-2">{selectedUser.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Qualities</span>
                </h5>
                <div className="card-text">
                  {selectedUser.qualities.map((item) => (
                    <h4
                      key={item._id}
                      className={'badge bg-' + item.color}
                      style={{ fontSize: '16px', margin: '5px 5px 10px 0' }}
                    >
                      {item.name}
                    </h4>
                  ))}
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Completed meetings</span>
                </h5>

                <h1 className="display-1">{selectedUser.completedMeetings}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <CommentsList {...{userId}}/>
          </div>
        </div>
      ) : (
        <IconSVG id={'loader'} />
      )}
    </div>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
