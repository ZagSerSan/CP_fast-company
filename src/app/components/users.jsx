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
  const [sortedSettings, setSortedSettings] = useState({iter: 'name', order: 'asc'})

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

  //todo сортировка
  const handleSort = (item) => {
    if (sortedSettings.iter === item) {
      setSortedSettings(prevState => ({...prevState, order: prevState.order==='asc'?'desc':'asc'}))
    } else {
      setSortedSettings({iter: item, order: 'desc'})
    }
  }
  const sortedUsers = _.orderBy(filteredUsers, [sortedSettings.iter], [sortedSettings.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setCurrentPage(1)
  }
  const clearFilter = () => {
    setSelectedProf()
    // обнуление масива users
    onRefreshUsers()
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
        onSort={handleSort}
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
  onToggleBookMark: PropTypes.func.isRequired
}

export default Users
