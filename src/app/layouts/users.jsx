import React from 'react'
import { useParams } from 'react-router-dom'
// components
import UserPage from '../components/page/userPage'
import UsersList from '../components/page/usersListPage'

const Users = () => {
  const { userId } = useParams()

  return userId ? <UserPage {...{ userId }} /> : <UsersList />
}

export default Users
