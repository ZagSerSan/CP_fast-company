import React from 'react'
import { useState } from 'react'
import IconSVG from './iconSVG'
// import PropTypes from 'prop-types'
import User from './user'

const UsersTable = ({users, onDelete, onToggleBookMark, onSort, sortedSettings}) => {
  const [thState, setThState] = useState([
    {name: 'Имя',}
  ])
  return (<>
    <table className="table">
      <thead>
        <tr>
          <th
            className='th'
            onClick={()=>onSort('name')}
            scope="col"
            >
              Имя<IconSVG id={sortedSettings.order==='asc'?'sort-ascending':'sort-descending'}/>
          </th>
          <th scope="col">Качества</th>
          <th
            className='th'
            onClick={()=>onSort('profession')}
            scope="col"
            >
              Профессия<IconSVG id={sortedSettings.order==='asc'?'sort-ascending':'sort-descending'}/>
          </th>
          <th
            className='th'
            onClick={()=>onSort('completedMeetings')}
            scope="col"
            >
              Встретился раз<IconSVG id={sortedSettings.order==='asc'?'sort-ascending':'sort-descending'}/>
          </th>
          <th 
            className='th' 
            onClick={()=>onSort('rate')} 
            scope="col"
            >
              Оценка<IconSVG id={sortedSettings.order==='asc'?'sort-ascending':'sort-descending'}/>
          </th>
          <th 
            className='th' 
            onClick={()=>onSort('bookmark')} 
            scope="col"
            >
              Избранное<IconSVG id={sortedSettings.order==='asc'?'sort-ascending':'sort-descending'}/>
          </th>
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