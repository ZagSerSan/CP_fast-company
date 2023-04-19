import React,{useState} from 'react'
import User from './user'
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

const Users = ({users, onDelete, onToggleBookMark}) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(users, currentPage, pageSize)

  return <>
    {count > 0 &&
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
        {userCrop.map(user =>
          <User key={user._id} user={user} onHandleDelete={onDelete} onToggleBookMark={onToggleBookMark}/>
        )}
        </tbody>
      </table>
    }
    <Pagination
      itemsCount={count}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={handlePageChange}/>
  </>
}

export default Users