import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Table from '../common/table/table'
import Qualitie from './qualitie'
import Bookmark from '../common/bookmark'
import Profession from './profession'

const UsersTable = ({
  users,
  sortSettings,
  setSortSettings,
  toggleBookMark,
  handleDelete
}) => {
  const [thState, setThState] = useState({
    name: { name: 'Имя', path: 'name' },
    qualities: {
      name: 'Качества',
      path: '',
      component: (user) => <Qualitie qualityIds={user.qualities} />
    },
    profession: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { name: 'Встречи', path: 'completedMeetings' },
    rate: { name: 'Оценка', path: 'rate' },
    bookmark: {
      name: 'Избранное',
      path: 'bookmark',
      component: (user) => (
        <Bookmark user={user} toggleBookMark={toggleBookMark} />
      )
    },
    delete: {
      name: '',
      path: '',
      component: (user) => (
        <button
          onClick={() => handleDelete(user._id)}
          className="btn btn-danger"
        >
          delete
        </button>
      )
    }
  })

  return (
    <>
      <Table
        {...{
          users,
          sortSettings,
          setSortSettings,
          thState,
          setThState
        }}
      />
    </>
  )
}

UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  sortSettings: PropTypes.object.isRequired,
  setSortSettings: PropTypes.func.isRequired,
  toggleBookMark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default UsersTable
