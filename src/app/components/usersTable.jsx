import React from 'react'
// import { useState } from 'react'
import IconSVG from './iconSVG'
// import PropTypes from 'prop-types'
import User from './user'

const UsersTable = ({users, onDelete, onToggleBookMark, onSort, sortedSettings, thState}) => {

  return (<>
    <table className="table">
      <thead>
        <tr>
          {thState.map(item => (
            <th
              key={item.id}
              className={item.iter ? 'th' : ''}
              onClick={item.iter ? ()=>onSort(item.sortKey) : null}
              scope="col"
            >
              {item.name}
              {item.iter && <IconSVG id={item.iconOrder ? 'sort-descending' : 'sort-ascending'}/>}
          </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
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

export default UsersTable