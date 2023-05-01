import React, { useEffect, useState } from "react"
import Users from "./components/users"
// import SearchStatus from "./components/searchStatus"
import apiUsers from "./api/fake.api/user.api"

function App() {
  const [users, setUsers] = useState()

  useEffect(()=>{
    apiUsers.fetchAll().then(data => setUsers(data))
  }, [])

  // setTimeout(() => {
  //   console.log('users=', users)
  // }, 3000);

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
      <>
        {/* <SearchStatus users={users} /> */}
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={ToggleBookMark}
        />
      </>
      )}
  </>)
}
export default App
