import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.css';

const professions = {
  doctor: { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  waiter: { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  physics: { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  engineer: { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  actor: { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
  cook: { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" }
}
const qualities = {
  tedious: { _id: "67rdca3eeb7f6fgeed471198", name: "Нудила", color: "primary" },
  strange: { _id: "67rdca3eeb7f6fgeed471100", name: "Странный", color: "secondary" },
  buller: { _id: "67rdca3eeb7f6fgeed4711012", name: "Троль", color: "success" },
  alcoholic: { _id: "67rdca3eeb7f6fgeed471101", name: "Алкоголик", color: "danger" },
  handsome: { _id: "67rdca3eeb7f6fgeed471102", name: "Красавчик", color: "info" },
  uncertain: { _id: "67rdca3eeb7f6fgeed471103", name: "Неуверенный", color: "dark" },
}

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  // const handleDelete = () => {
  // }
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
        <td><button className='btn btn-danger'>delete</button></td>
      </tr>
      )
    )
  }

  return <table className="table">
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
  
}

export default Users