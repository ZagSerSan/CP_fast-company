import React from 'react'

const User = ({userCrop,userId}) => {
  const userItem = userCrop.find(item => item._id === userId)
  // console.log('userItem', userItem);
  // console.log('userId', userId);
  return (
    <h3>{userItem.name}</h3>
  )
}
 
export default User