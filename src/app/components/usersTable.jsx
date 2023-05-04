import React from 'react'
// import PropTypes from 'prop-types'
import User from './user'

const UsersTable = ({users, onDelete, onToggleBookMark, onSort}) => {
  

  return (<>
    <svg style={{display: 'none'}}>
      <symbol id="sort-ascending" viewBox="0 0 24 24">
        <path d="M4 17H10M4 12H13M18 11V19M18 19L21 16M18 19L15 16M4 7H16" stroke="#000000"/>
      </symbol>
      <symbol id='sort-descending'>
        <path d="M4 17H16M4 12H13M4 7H10M18 13V5M18 5L21 8M18 5L15 8" stroke="#000000"/>
      </symbol>
    </svg>

    <table className="table">
      <thead>
        <tr>
          <th className='th' onClick={()=>onSort('name')} scope="col">Имя<svg className='sort_icon'><use href="#sort-ascending"></use></svg></th>
          <th scope="col">Качества</th>
          <th className='th' onClick={()=>onSort('profession')} scope="col">Профессия<svg className='sort_icon'><use href="#sort-ascending"></use></svg></th>
          <th className='th' onClick={()=>onSort('completedMeetings')} scope="col">Встретился раз<svg className='sort_icon'><use href="#sort-ascending"></use></svg></th>
          <th className='th' onClick={()=>onSort('rate')} scope="col">Оценка<svg className='sort_icon'><use href="#sort-ascending"></use></svg></th>
          <th className='th' onClick={()=>onSort('bookmark')} scope="col">Избранное<svg className='sort_icon'><use href="#sort-ascending"></use></svg></th>
          <th scope="col"></th>
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