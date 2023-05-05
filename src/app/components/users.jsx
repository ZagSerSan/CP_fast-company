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

const Users = ({ users, onDelete, onToggleBookMark, onRefreshUsers }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortSettings, setSortSettings] = useState({iter: 'name', order: 'asc'})
  // const [thState, setThState] = useState([
  //   {id: 'th1', name: 'Имя', sortKey: 'name', iconOrder: false},
  //   {id: 'th2', name: 'Качества', sortKey: '', iconOrder: true},
  //   {id: 'th3', name: 'Профессия', sortKey: 'profession.name', iconOrder: true},
  //   {id: 'th4', name: 'Встретился раз', sortKey: 'completedMeetings', iconOrder: true},
  //   {id: 'th5', name: 'Оценка', sortKey: 'rate', iconOrder: true},
  //   {id: 'th6', name: 'Избранное', sortKey: 'bookmark', iconOrder: true},
  //   {id: 'th7', name: '', sortKey: '', iconOrder: true}
  // ])
  const [thState, setThState] = useState({
    name: {name: 'Имя', sortKey: 'name', iconOrder: false},
    qualities: {name: 'Качества', sortKey: '', iconOrder: true},
    profession: {name: 'Профессия', sortKey: 'profession.name', iconOrder: true},
    completedMeetings: {name: 'Встретился раз', sortKey: 'completedMeetings', iconOrder: true},
    rate: {name: 'Оценка', sortKey: 'rate', iconOrder: true},
    bookmark: {name: 'Избранное', sortKey: 'bookmark', iconOrder: true},
    delete: {name: '', sortKey: '', iconOrder: true}
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
    setThState(prevState => prevState.map(thItem => {
      return {
        ...thItem,
        iconOrder: thItem.sortKey === 'name' ? false : true
      }
    }))
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
