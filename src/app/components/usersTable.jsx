import React from 'react'
import PropTypes from 'prop-types'
import Table from './table'

const UsersTable = ({
  users,
  thState,
  sortSettings,
  onSetSortSettings,
  onSetThState
}) => {

  return (<>
    <Table {...{sortSettings,onSetSortSettings,thState,onSetThState,users}}/>
  </>)
}

UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  sortSettings: PropTypes.object.isRequired,
  onSetSortSettings: PropTypes.func.isRequired,
  thState: PropTypes.object.isRequired,
  onSetThState: PropTypes.func.isRequired,
}

export default UsersTable
