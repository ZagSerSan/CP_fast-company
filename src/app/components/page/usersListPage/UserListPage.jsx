import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
// utils
import apiUsers from '../../../api/fake.api/user.api'
import professionsApi from '../../../api/fake.api/professions.api'
import { paginate } from '../../../utils/paginate'
// components
import SearchStatus from '../../ui/searchStatus'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import UsersTable from '../../usersTable'
import IconSVG from '../../common/iconSVG'

const UserListPage = () => {
  const [users, setUsers] = useState()
  // начальное состояние пользователей для сброса
  const [firstUsersState, setFirstUsersState] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortSettings, setSortSettings] = useState({
    iter: 'name',
    order: 'asc'
  })
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    apiUsers.fetchAll().then((data) => setUsers(data))
    apiUsers.fetchAll().then((data) => setFirstUsersState(data))
  }, [])
  useEffect(() => {
    professionsApi.fetchAll().then((data) => setProfession(data))
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
    setUsers((prevState) =>
      prevState.map((item) => {
        return {
          ...item,
          bookmark: item._id === userId ? !item.bookmark : item.bookmark
        }
      })
    )
    // change localStore
    const users = JSON.parse(localStorage.getItem('users'))
    const userIndex = users.findIndex((u) => u._id === userId)
    users[userIndex] = {
      ...users[userIndex],
      bookmark: !users[userIndex].bookmark
    }
    localStorage.setItem('users', JSON.stringify(users))
  }

  if (users) {
    const pageSize = 4

    const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex)
    }

    // todo поиск юсера
    const changeSearchValue = ({ target }) => {
      setSelectedProf()
      setSearchValue(target.value)
    }
    const searchedUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchValue)
    })

    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : searchValue
      ? searchedUsers
      : users
    // для изменения страниц
    const count = selectedProf
      ? filteredUsers.length
      : searchValue
      ? searchedUsers.length
      : users.length
    const sortedUsers = _.orderBy(
      filteredUsers,
      [sortSettings.iter],
      [sortSettings.order]
    )
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    // изменение страницы при кол-ве польз = 0 на текущей
    if (userCrop.length === 0 && count !== 0) {
      setCurrentPage((prevState) => prevState - 1)
    }

    // функция фильтра профессий
    const handleProfessionSelect = (item) => {
      setSelectedProf(item)
      setCurrentPage(1)
      setSearchValue('')
    }
    // функция сброса (глобально)
    const clearFilter = () => {
      // обнуление: фильтра профессии,
      setSelectedProf()
      // масива users,
      refreshUsers()
      // текущей страницы,
      setCurrentPage(1)
      // параметров сортировки
      setSortSettings({ iter: 'name', order: 'asc' })
      // поиск
      setSearchValue('')
    }

    return (
      <>
        <div className="main-table">
          <div className="filter">
            {professions && (
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
            )}
          </div>
          <div className="content">
            <SearchStatus count={count} />
            <div>
              <input
                type="text"
                placeholder="поиск"
                onChange={changeSearchValue}
                value={searchValue}
              />
            </div>
            {count > 0 && (
              <UsersTable
                users={userCrop}
                sortSettings={sortSettings}
                setSortSettings={setSortSettings}
                toggleBookMark={toggleBookMark}
                handleDelete={handleDelete}
              />
            )}
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </>
    )
  } // if (users)
  // if else -> return "Loading..."
  return <IconSVG id={'loader'} />
}

export default UserListPage
