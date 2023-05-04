import React, { useEffect, useState } from "react"
import '../css/index.css'
import apiUsers from "./api/fake.api/user.api"
import Users from "./components/users"

function App() {
  const [users, setUsers] = useState()

  useEffect(()=>{
    apiUsers.fetchAll().then(data => setUsers(data))
  }, [])

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== id))
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
        />
      )}
  </>)
}
export default App
