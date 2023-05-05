import React from 'react'
import PropTypes from 'prop-types'
import User from './user'
import TableHeader from './tableHeader'

const UsersTable = ({
  users,
  onDelete,
  onToggleBookMark,
  sortSettings,
  onSetSortSettings,
  thState,
  onSetThState
}) => {

  return (<>
    <table className="table">
      <TableHeader {...{sortSettings,onSetSortSettings,thState,onSetThState}}/>
      <tbody>
        {users.map(user => (
          <User
            key={user._id}
            user={user}
            onHandleDelete={onDelete}
            onToggleBookMark={onToggleBookMark}
          />
        ))}
      </tbody>
    </table>
  </>)
}

UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  sortSettings: PropTypes.object.isRequired,
  onSetSortSettings: PropTypes.func.isRequired,
  // thState: PropTypes.array.isRequired,
  thState: PropTypes.object.isRequired,
  onSetThState: PropTypes.func.isRequired,
}

export default UsersTable
