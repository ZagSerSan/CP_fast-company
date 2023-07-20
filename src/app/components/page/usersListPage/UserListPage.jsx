import React, { useState } from 'react'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
// utils
import { paginate } from '../../../utils/paginate'
// hooks
import { useUsers } from '../../../hooks/useUsers'
import { useProfession } from '../../../hooks/useProfession'
// components
import SearchStatus from '../../ui/searchStatus'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import UsersTable from '../../ui/usersTable'
import IconSVG from '../../common/iconSVG'
import { useAuth } from '../../../hooks/useAuth'

const UserListPage = () => {
  const { users } = useUsers()
  const { currentUser } = useAuth()
  const {isLoading: professionsLoading, professions} = useProfession()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortSettings, setSortSettings] = useState({
    iter: 'name',
    order: 'asc'
  })
  const [searchValue, setSearchValue] = useState('')

  // func for refresh all users
  // const refreshUsers = () => {
    // setUsers(firstUsersState)
    // console.log('"refreshUsers" not a func')
  // }
  // toogle bookmark function
  const toggleBookMark = (userId) => {
    // const newArray = users.map((item) => {
    //   return {
    //     ...item,
    //     bookmark: item._id === userId ? !item.bookmark : item.bookmark
    //   }
    // })
    // setUsers(newArray)
    // setUsers((prevState) =>
    //   prevState.map((item) => {
    //     return {
    //       ...item,
    //       bookmark: item._id === userId ? !item.bookmark : item.bookmark
    //     }
    //   })
    // )
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
      return user.name?.toLowerCase().includes(searchValue)
    })

    const filterUsers = (data) => {
      const filteredUsers = selectedProf
        ? data.filter((user) => user.profession._id === selectedProf._id)
        : searchValue
        ? searchedUsers
        : data
      return filteredUsers.filter(u => u._id !== currentUser._id)
    }
    
    const filteredUsers = filterUsers(users)

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
      // refreshUsers()
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
            {professions && !professionsLoading && (
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
  }
  return <IconSVG id={'loader'} />
}

export default UserListPage
