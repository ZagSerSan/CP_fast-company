import React from 'react'
import { useParams } from 'react-router-dom'
// components
import UserPage from '../components/page/userPage'
import UserEdit from '../components/page/userPage/userEdit'
import UsersList from '../components/page/usersListPage'

const Users = () => {
  const { userId, edit } = useParams()

  return userId ? (
    edit ? (
      <UserEdit userId={userId} />
    ) : (
      <UserPage {...{ userId }} />
    )
  ) : (
    <UsersList />
  )
  // return userId ? <UserPage {...{ userId }} /> : <UsersList />
}

export default Users
