import React from 'react'
import Qualitie from './qualitie';
import 'bootstrap/dist/css/bootstrap.css';

const User = ({user, onHandleDelete}) => {
  return <>
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <Qualitie qualities={user.qualities}/>
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate + '/5'}</td>
      <td><button onClick={()=>onHandleDelete(user._id)} className='btn btn-danger'>delete</button></td>
    </tr>
  </>
}

export default User