import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import _ from 'lodash'
import "bootstrap/dist/css/bootstrap.css"
// any utils
import { paginate } from "../utils/paginate"
import professionsApi from "../api/fake.api/professions.api"
// components
import SearchStatus from "./searchStatus"
import Pagination from "./pagination"
import GroupList from "./groupList"
import UsersTable from "./usersTable"
import Bookmark from './bookmark';

const Users = ({ users, onDelete, onToggleBookMark, onRefreshUsers }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortSettings, setSortSettings] = useState({iter: 'name', order: 'asc'})
  const [thState, setThState] = useState({
    name: {name: 'Имя', path: 'name', iconOrder: false},
    qualities: {name: 'Качества', path: '', iconOrder: false},
    profession: {name: 'Профессия', path: 'profession.name', iconOrder: false},
    completedMeetings: {name: 'Встретился раз', path: 'completedMeetings', iconOrder: false},
    rate: {name: 'Оценка', path: 'rate', iconOrder: false},
    bookmark: {name: 'Избранное', path: 'bookmark', iconOrder: false, component: (user) => (<Bookmark user={user} onToggleBookMark={onToggleBookMark} />)},
    delete: {name: '', path: '', iconOrder: false, component: (user) => (
      <button
        onClick={() => onDelete(user._id)}
        className="btn btn-danger"
      >
        delete
      </button>
    )}
  })

  let count = users.length
  const pageSize = 4

  useEffect(() => {
    professionsApi.fetchAll().then(data => setProfession(data))
  }, [])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession.name === selectedProf.name)
    : users
  // для изменения страниц
  count = selectedProf ? filteredUsers.length : users.length

  const sortedUsers = _.orderBy(filteredUsers, [sortSettings.iter], [sortSettings.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)
  useEffect(()=>{
    setCurrentPage(prevState => {
      if (userCrop.length === 0 && count != 0) {
         return prevState-1
      } else {
        return prevState
      }
    })
  },[userCrop])

  // функция фильтра профессий
  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setCurrentPage(1)
  }
  // функция сброса (глобально)
  const clearFilter = () => {
    // обнуление: фильтра профессии,
    setSelectedProf()
    // масива users,
    onRefreshUsers()
    // текущей страницы,
    setCurrentPage(1)
    // параметров сортировки,
    setSortSettings({iter: 'name', order: 'asc'})
    // состояние заголовков таблицы
    for (let key in thState) {
        thState[key].iconOrder = false
    }
  }

  return (
  <>
    <div className="filter">
      {professions &&
      <div>
        <GroupList
          selectedProf={selectedProf}
          items={professions}
          onItemSelect={handleProfessionSelect}
        />
        <button 
          className="btn btn-secondary clear-btn"
          onClick={clearFilter}
        >
            Сбросить
        </button>
      </div>
      }
    </div>
    <div className="content">
      <SearchStatus count={count} />
      {count > 0 &&
      <UsersTable
        onToggleBookMark={onToggleBookMark}
        onDelete={onDelete}
        users={userCrop}
        thState={thState}
        sortSettings={sortSettings}
        onSetSortSettings={setSortSettings}
        onSetThState={setThState}
        onRefreshUsers={onRefreshUsers}
      />}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  </>)
}

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onRefreshUsers: PropTypes.func.isRequired
}

export default Users
