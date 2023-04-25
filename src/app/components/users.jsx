import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.css"
// any utils
import { paginate } from "../utils/paginate"
import api from "../api"
// components
import User from "./user"
import Pagination from "./pagination"
import GroupList from "./groupList"

const Users = ({ users, onDelete, onToggleBookMark }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const count = users.length
  const pageSize = 4
  useEffect(() => {
    api.professions.fetchAll().then(data => setProfession(data))
  }, [])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const userCrop = paginate(users, currentPage, pageSize)

  const handleProfessionSelect = (params) => {
    console.log(params)
  }
  return (
    <>
      <GroupList items={professions} onItemSelect={() => handleProfessionSelect(professions)}/>
      {count > 0 && (
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
            {userCrop.map((user) => (
              <User
                key={user._id}
                user={user}
                onHandleDelete={onDelete}
                onToggleBookMark={onToggleBookMark}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
}

export default Users
