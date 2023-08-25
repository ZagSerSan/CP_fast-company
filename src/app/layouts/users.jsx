import React from 'react'
import { useParams } from 'react-router-dom'
// components
import UserPage from '../components/page/userPage'
import UserEdit from '../components/page/userPage/userEdit'
import UsersList from '../components/page/usersListPage'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
  const { userId, edit } = useParams()
  const currentUserId = useSelector(getCurrentUserId())
 
  return (
    <UsersLoader>
      {userId ? (
        edit ? (
          <UserEdit {...{currentUserId, edit}} />
        ) : (
          <UserPage {...{ userId }} />
        )
      ) : (
        <UsersList />
      )}
    </UsersLoader>
  )
}

export default Users
