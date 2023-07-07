import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// css
import 'bootstrap/dist/css/bootstrap.css'
import './userPage.css'
// components
import apiUsers from '../../../api/fake.api/user.api'
import IconSVG from '../../common/iconSVG'
import CommentsList from './commentsList'
import UserCard from './userCard'
import QualitiesCard from './qualitiesCard'
import MeetingsCard from './meetingsCard'

const UserPage = ({ userId }) => {
  const [selectedUser, setSelectedUser] = useState()
  useEffect(() => {
    apiUsers.getUserById(userId).then((data) => setSelectedUser({ ...data }))
  }, [])

  return (
    <div className="container">
      {selectedUser ? (
        <div className="row gutters-sm mt-2">
          <div className="col-md-4 mb-3">
            <UserCard
              name={selectedUser.name}
              profession={selectedUser.profession.name}
              rate={selectedUser.rate}
              userId={userId}
            />
            <QualitiesCard qualities={selectedUser.qualities} />
            <MeetingsCard meetings={selectedUser.completedMeetings} />
          </div>

          <div className="col-md-8">
            <CommentsList {...{ userId }} />
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
