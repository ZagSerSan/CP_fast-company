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
    <>
    <div className="container">
      <div className="row gutters-sm mt-2">

        <div className="col-md-4 mb-3">
          {selectedUser ? (<>
            <div className="card mb-3">
              <div className="card-body">
                <Link
                  to={`${userId}/edit`}
                  className="position-absolute top-0 end-0 btn btn-light btn-sm"
                  style={{zIndex: '1'}}
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
                    <p className="text-secondary mb-1">{selectedUser.profession.name}</p>
                    <div className="text-muted">
                      <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                      <i className="bi bi-caret-up text-secondary" role="button"></i>
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
                <p className="card-text">
                {selectedUser.qualities.map((item) => (
                  <h4
                    key={item._id}
                    className={'badge bg-' + item.color}
                    style={{ fontSize: '16px', margin: '5px 5px 10px 0' }}
                  >
                    {item.name}
                  </h4>
                ))}
                </p>
              </div>
            </div>
            </>
            // <div className="user-page">
            //   <h2 className="user-name">
            //     <b>{selectedUser.name}</b>
            //   </h2>
            //   <h5>
            //     <b>Email:</b> {selectedUser.email}
            //   </h5>
            //   <h5>
            //     <b>Sex:</b>{' '}
            //     {selectedUser.sex[0].toUpperCase() + selectedUser.sex.slice(1)}
            //   </h5>
            //   <h5>
            //     <b>Профессия:</b> {selectedUser.profession.name}
            //   </h5>
            //   {selectedUser.qualities.map((item) => (
            //     <h4
            //       key={item._id}
            //       className={'badge bg-' + item.color}
            //       style={{ fontSize: '16px', margin: '5px 0 10px' }}
            //     >
            //       {item.name}
            //     </h4>
            //   ))}
            //   <h5>
            //     <b>Completed Meetings:</b> {selectedUser.completedMeetings}
            //   </h5>
            //   <h5>
            //     <b>Rate:</b> {selectedUser.rate}
            //   </h5>
            //   <h5>
            //     <b>Bookmark:</b>{' '}
            //     {selectedUser.bookmark ? (
            //       <i
            //         style={{ fontSize: '20px' }}
            //         className="bi bi-bookmark-star-fill"
            //       ></i>
            //     ) : (
            //       <i style={{ fontSize: '20px' }} className="bi bi-bookmark"></i>
            //     )}
            //   </h5>
            //   <button
            //     className="btn btn-secondary"
            //     style={{marginRight: '10px'}}
            //     onClick={backToUsers}
            //   >
            //     Back to Users
            //   </button>
            //   <Link className="btn btn-warning" to={`${userId}/edit`}>
            //     Edit user
            //   </Link>
            // </div>
          ) : (
            <IconSVG id={'loader'} />
          )}
        </div>

        <div className="col-md-8">
          right collumn
        </div>

      </div>
    </div>

    </>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
