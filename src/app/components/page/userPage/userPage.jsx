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
    apiUsers.getUserById(userId).then((data) => setSelectedUser({...data}))
  }, [])
  const backToUsers = () => {
    history.replace('/Users')
  }

  return (<>
    {selectedUser ? (
      <div className="user-page">
        <h2 className='user-name'>{selectedUser.name}</h2>
        <h5>Email: {selectedUser.email}</h5>
        <h4>Профессия: {selectedUser.profession.name}</h4>
        {selectedUser.qualities.map((item) => (
          <h4 key={item._id} className={'badge bg-' + item.color + ' m-1'}>
            {item.name}
          </h4>
        ))}
        <h5>Completed Meetings: {selectedUser.completedMeetings}</h5>
        <h5>Rate: {selectedUser.rate}</h5>
        <button className="btn btn-secondary btnBackMarginRight" onClick={backToUsers}>Back to Users</button>
        <Link className="btn btn-warning" to={`${userId}/edit`}>
          Edit user
        </Link>
      </div>
    ) : (
      <IconSVG id={'loader'} />
    )}
  </>)
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
