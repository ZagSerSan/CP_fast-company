import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import Qualitie from '../../ui/qualitie'
import Bookmark from '../../common/bookmark'

const Table = ({
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
      component: (user) => <Qualitie qualities={user.qualities} />
    },
    profession: { name: 'Профессия', path: 'profession.name' },
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
    <table className="table" style={{ minWidth: '1010px' }}>
      <TableHeader
        {...{ sortSettings, setSortSettings, thState, setThState }}
      />
      <TableBody {...{ data: users, thState }} />
    </table>
  )
}

Table.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  sortSettings: PropTypes.object.isRequired,
  setSortSettings: PropTypes.func.isRequired,
  toggleBookMark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Table
