import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const Users = ({users, handleDelete}) => {
  return <>
    {users.map(user =>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map(quality => 
            <span className={'badge bg-' + quality.color + ' m-1'}
            >
              {quality.name}
            </span>)
          }
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate + '/5'}</td>
        <td><button onClick={()=>handleDelete(user._id)} className='btn btn-danger'>delete</button></td>
      </tr>
    )}
  </>
}

export default Users