import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.css';

const Users = () => {

  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (id) => {
    setUsers(prevState => prevState.filter(item => item !== id))
  }

  const handlePhrase = () => {
    return (
      users.map(user =>
      <tr key={user._id}>
        <td key={user.name}>{user.name}</td>
        <td key={user.qualities}>
          {user.qualities.map(quality => 
            <span
            key={quality.name}
            className={'badge bg-' + quality.color + ' m-1'}
            >
              {quality.name}
            </span>)
          }
        </td>
        <td key={user.profession.name}>{user.profession.name}</td>
        <td key={user.completedMeetings}>{user.completedMeetings}</td>
        <td key={user.rate}>{user.rate + '/5'}</td>
        <td><button onClick={()=>handleDelete(user)} className='btn btn-danger'>delete</button></td>
      </tr>
      )
    )
  }

  if (users.length === 0) {
    return <h1 style={{fontSize: '24px'}} className='badge bg-danger m-1'>никто не тусанет с тобой сегодня</h1>
  }

  return <> 
    <h1 style={{fontSize: '24px'}} className='badge bg-primary m-1'>{users.length} человек тусанет с тобой сегодня</h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">кнопки</th>
        </tr>
      </thead>
      <tbody>
        {handlePhrase()}
      </tbody>
    </table>
  </>
}

export default Users