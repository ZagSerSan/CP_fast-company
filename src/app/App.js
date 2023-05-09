import React, { useEffect, useState } from "react"
import '../css/index.css'
import apiUsers from "./api/fake.api/user.api"
import Users from "./components/users"

function App() {
  const [users, setUsers] = useState()
  // начальное состояние пользователей для сброса
  const [firstUsersState, setFirstUsersState] = useState()

  useEffect(()=>{
    apiUsers.fetchAll().then(data => setUsers(data))
    apiUsers.fetchAll().then(data => setFirstUsersState(data))
  }, [])

  // функция кнопки удаления
  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== id))
  }
  // func for refresh all users
  const refreshUsers = () => {
    setUsers(firstUsersState)
  }
  // toogle bookmark function
  const ToggleBookMark = (userId) => {
    setUsers(prevState =>
      prevState.map((item) => {
        return {
          ...item,
          bookmark: item._id === userId ? !item.bookmark : item.bookmark
        }
      })
    )
  }

  return (<>
    {users && (
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={ToggleBookMark}
        onRefreshUsers={refreshUsers}
      />
    )}
  </>)
}

export default App
