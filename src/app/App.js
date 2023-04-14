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

  return (<>
    <SearchStatus users={users}/>
    {users.length !== 0 &&
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <Users users={users} onDelete={handleDelete} onToggleBookMark={ToggleBookMark}/>
        </tbody>
      </table>
      }
    </>
    )
}
export default App