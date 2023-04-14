import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const User = ({user, onHandleDelete}) => {
  return <>
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map(quality => 
          <span key={quality._id} className={'badge bg-' + quality.color + ' m-1'}
          >
            {quality.name}
          </span>)
        }
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate + '/5'}</td>
      <td><button onClick={()=>onHandleDelete(user._id)} className='btn btn-danger'>delete</button></td>
    </tr>
  </>
}

export default User