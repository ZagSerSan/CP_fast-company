import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// components
import UserPage from '../components/page/userPage'
import UserEdit from '../components/page/userPage/userEdit'
import UsersList from '../components/page/usersListPage'
import UserProvider from '../hooks/useUsers'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../store/users'
import IconSVG from '../components/common/iconSVG'

const Users = () => {
  const { userId, edit } = useParams()
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsersList())
    }
  }, [])

  if (!dataStatus) return <IconSVG id={'loader'}/>
  return (
    <UserProvider>
      {userId ? (
        edit ? (
          <UserEdit {...{userId, edit}} />
        ) : (
          <UserPage {...{ userId }} />
        )
      ) : (
        <UsersList />
      )}
    </UserProvider>
  )
}

export default Users
