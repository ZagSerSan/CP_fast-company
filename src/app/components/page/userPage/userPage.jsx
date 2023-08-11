import React from 'react'
import PropTypes from 'prop-types'
// components
import IconSVG from '../../common/iconSVG'
import CommentsList from './commentsList'
import UserCard from './userCard'
import QualitiesCard from './qualitiesCard'
import MeetingsCard from './meetingsCard'
// css, api (firebase), utils
import 'bootstrap/dist/css/bootstrap.css'
import './userPage.css'
import CommentsProvider from '../../../hooks/useComments'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

const UserPage = ({ userId }) => {
  const selectedUser = useSelector(getUserById(userId))

  return (
    <div className='container'>
      {selectedUser ? (
        <div className='row gutters-sm mt-2'>
          <div className='col-md-4 mb-3'>
            <UserCard user={selectedUser}/>
            <QualitiesCard qualitiesIds={selectedUser.qualities} />
            <MeetingsCard meetings={selectedUser.completedMeetings} />
          </div>

          <div className='col-md-8'>
            <CommentsProvider>
              <CommentsList {...{ userId }} />
            </CommentsProvider>
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
