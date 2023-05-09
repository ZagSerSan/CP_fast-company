import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({
  sortSettings,
  onSetSortSettings,
  thState,
  onSetThState,
  users,
}) => {
  return (
    <table className="table">
      <TableHeader {...{sortSettings,onSetSortSettings,thState,onSetThState}}/>
      <TableBody {...{data: users, thState}} />
    </table>
  )
}

Table.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  sortSettings: PropTypes.object.isRequired,
  onSetSortSettings: PropTypes.func.isRequired,
  thState: PropTypes.object.isRequired,
  onSetThState: PropTypes.func.isRequired,
}

export default Table
