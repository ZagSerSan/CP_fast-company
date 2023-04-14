import React from 'react'
import User from './user'
import 'bootstrap/dist/css/bootstrap.css';

const Users = ({users, onDelete, onToggleBookMark}) => {
  return <>
    {users.map(user =>
      <User key={user._id} user={user} onHandleDelete={onDelete} onToggleBookMark={onToggleBookMark}/>
    )}
  </>
}

export default Users