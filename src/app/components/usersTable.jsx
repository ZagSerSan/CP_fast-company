import React from 'react'
// import { useState } from 'react'
import IconSVG from './iconSVG'
import PropTypes from 'prop-types'
import User from './user'

const UsersTable = ({
  users,
  onDelete,
  onToggleBookMark,
  sortSettings,
  onSetSortSettings,
  thState,
  onSetThState
}) => {

  const handleSort = (itemSortKey) => {
    // изменение сортировки элементов таблицы
    if (sortSettings.iter === itemSortKey) {
      onSetSortSettings(prevState => ({...prevState, order: prevState.order==='asc'?'desc':'asc'}))
    } else {
      onSetSortSettings({iter: itemSortKey, order: 'asc'})
    }
    // изменение иконок при сортировке
    onSetThState(prevState => prevState.map(thItem => {
      return {
        ...thItem,
        iconOrder: thItem.sortKey === itemSortKey ? !thItem.iconOrder : true
      }
    }))
  }

  return (<>
    <table className="table">
      <thead>
        <tr>
          {thState.map(item => (
            <th
              key={item.id}
              className={item.iter ? 'th' : ''}
              onClick={item.iter ? ()=>handleSort(item.sortKey) : null}
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

UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  sortSettings: PropTypes.object.isRequired,
  onSetSortSettings: PropTypes.func.isRequired,
  thState: PropTypes.array.isRequired,
  onSetThState: PropTypes.func.isRequired,
}

export default UsersTable
