import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const User = ({userCrop,userId}) => {
  // useEffect(()=> {
    const userItem = userCrop.find(item => item._id === userId)
  // },[userCrop])
  // console.log('userItem', userItem);
  // console.log('userId', userId);
  return (
    <>
      <h2>{userItem.name}</h2>
      <h4>Профессия: {userItem.profession.name}</h4>
      {userItem.qualities.map(item => (
        <h4 className={'badge bg-'+item.color+' m-1'}>{item.name}</h4>
      ))}
      <h5>Completed Meetings: {userItem.completedMeetings}</h5>
      <h5>Rate: {userItem.rate}</h5>
      <Link className='btn btn-secondary' to='/Users'>All users</Link>
    </>
  )
}
 
export default User