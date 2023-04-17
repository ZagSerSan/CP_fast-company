import React,{useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api"

function App () {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (id) => {
    setUsers(prevState => prevState.filter(item => item._id !== id))
  }
  const ToggleBookMark = (id) => {
    setUsers(users.map(item => {
      return {
      ...item,
      bookmark: item._id === id ? !item.bookmark : item.bookmark
      }
    }))
  }

  return (
    <>
      <SearchStatus users={users}/>
      <Users users={users} onDelete={handleDelete} onToggleBookMark={ToggleBookMark}/>
    </>
  )
}
export default App