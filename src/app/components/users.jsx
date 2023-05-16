import React, { useState, useEffect } from "react"
import _ from 'lodash'
import "bootstrap/dist/css/bootstrap.css"
// utils
import apiUsers from "../api/fake.api/user.api"
import professionsApi from "../api/fake.api/professions.api"
import { paginate } from "../utils/paginate"
// components
import SearchStatus from "./searchStatus"
import Pagination from "./pagination"
import GroupList from "./groupList"
import UsersTable from "./usersTable"
import Bookmark from './bookmark'
import Qualitie from './qualitie'
import IconSVG from './iconSVG'

const Users = () => {
  const [users, setUsers] = useState()
  // начальное состояние пользователей для сброса
  const [firstUsersState, setFirstUsersState] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortSettings, setSortSettings] = useState({ iter: 'name', order: 'asc' })
  const [thState, setThState] = useState({
    name: { name: 'Имя', path: 'name', iconOrder: false },
    qualities: { name: 'Качества', path: '', iconOrder: false, component: (user) => (<Qualitie qualities={user.qualities} />) },
    profession: { name: 'Профессия', path: 'profession.name', iconOrder: false },
    completedMeetings: { name: 'Встретился раз', path: 'completedMeetings', iconOrder: false },
    rate: { name: 'Оценка', path: 'rate', iconOrder: false },
    bookmark: { name: 'Избранное', path: 'bookmark', iconOrder: false, component: (user) => (<Bookmark user={user} toggleBookMark={toggleBookMark} />) },
    delete: {
      name: '', path: '', iconOrder: false, component: (user) => (
        <button
          onClick={() => handleDelete(user._id)}
          className="btn btn-danger"
        >
          delete
        </button>
      )
    }
  })
  useEffect(() => {
    apiUsers.fetchAll().then(data => setUsers(data))
    apiUsers.fetchAll().then(data => setFirstUsersState(data))
  }, [])
  useEffect(() => {
    professionsApi.fetchAll().then(data => setProfession(data))
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
  const toggleBookMark = (userId) => {
    setUsers(prevState =>
      prevState.map((item) => {
        return {
          ...item,
          bookmark: item._id === userId ? !item.bookmark : item.bookmark
        }
      })
    )
  }

  if (users) {
    const pageSize = 4

    const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex)
    }

    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users
    // для изменения страниц
    let count = selectedProf ? filteredUsers.length : users.length

    const sortedUsers = _.orderBy(filteredUsers, [sortSettings.iter], [sortSettings.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    // изменение страницы при кол-ве польз = 0 на текущей
    if (userCrop.length === 0 && count != 0) {
      setCurrentPage(prevState => prevState - 1)
    }

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
      refreshUsers()
      // текущей страницы,
      setCurrentPage(1)
      // параметров сортировки,
      setSortSettings({ iter: 'name', order: 'asc' })
      // состояние заголовков таблицы
      for (let key in thState) {
        thState[key].iconOrder = false
      }
    }

    return (
    <div className="main-table">
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
            users={userCrop}
            thState={thState}
            sortSettings={sortSettings}
            onSetSortSettings={setSortSettings}
            onSetThState={setThState}
          />}
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>)
  } // if (users)
  // return "Loading..."
  return <IconSVG id={'loader'}/>
}

export default Users
