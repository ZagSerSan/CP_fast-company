import React, { useEffect, useState } from "react"
import '../css/index.css'
import apiUsers from "./api/fake.api/user.api"
import Users from "./components/users"

function App() {
  const [users, setUsers] = useState()
  const [firstUsersState, setFirstUsersState] = useState()

  useEffect(()=>{
    apiUsers.fetchAll().then(data => setUsers(data))
    apiUsers.fetchAll().then(data => setFirstUsersState(data))
  }, [])

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== id))
  }
  // refresh all users
  const refreshUsers = () => {
    setUsers(firstUsersState)
  }
  const ToggleBookMark = (id) => {
    setUsers(
      users.map((item) => {
        return {
          ...item,
          bookmark: item._id === id ? !item.bookmark : item.bookmark
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
