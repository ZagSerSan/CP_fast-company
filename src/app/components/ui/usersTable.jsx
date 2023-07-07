import React from 'react'
import PropTypes from 'prop-types'
import Table from '../common/table/table'

const UsersTable = ({
  users,
  sortSettings,
  setSortSettings,
  toggleBookMark,
  handleDelete
}) => {
  return (
    <>
      <Table
        {...{
          users,
          sortSettings,
          setSortSettings,
          toggleBookMark,
          handleDelete
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
