import React from 'react'
import PropTypes from 'prop-types'
import Table from './table'

const UsersTable = ({
  users,
  sortSettings,
  onSetSortSettings,
  toggleBookMark
}) => {

  return (<>
    <Table {...{sortSettings,onSetSortSettings,users,toggleBookMark}}/>
  </>)
}

UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  sortSettings: PropTypes.object.isRequired,
  onSetSortSettings: PropTypes.func.isRequired,
  toggleBookMark: PropTypes.func.isRequired
}

export default UsersTable
