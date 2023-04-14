import React,{useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api"

function App () {
  // состояние
  const [users, setUsers] = useState(api.users.fetchAll())
  console.log(users);

  // удаление пользователя
  const handleDelete = (id) => {
    setUsers(prevState => prevState.filter(item => item._id !== id))
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
            <th scope="col">Удалить</th>
          </tr>
        </thead>
        <tbody>
          <Users users={users} handleDelete={handleDelete}/>
        </tbody>
      </table>
      }
    </>
    )
}
export default App