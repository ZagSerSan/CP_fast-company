import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link
          to={`${user.userId}/edit`}
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          style={{ zIndex: '1' }}
        >
          <i className="bi bi-gear"></i>
        </Link>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.avatar}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="120"
            height="120"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object
}

export default UserCard
