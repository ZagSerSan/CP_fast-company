import React from 'react'
import PropTypes from 'prop-types'
import IconSVG from './iconSVG'

const TableHeader = ({
  sortSettings,
  setThState,
  thState,
}) => {

  const handleSort = (itemSortKey) => {
    // измен сорт кликом по активному элем (тот самый)
    if (sortSettings.iter === itemSortKey) {
      setThState(prevState => ({...prevState, order: prevState.order==='asc'?'desc':'asc'}))
    } else {
      // измен сорт кликом по НЕактивному элем (НЕ тот самый)
      setThState({iter: itemSortKey, order: 'asc'})
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys(thState).map(thStateKey => (
          <th
            key={thStateKey}
            className={thState[thStateKey].path ? 'th' : ''}
            onClick={thState[thStateKey].path ? ()=>handleSort(thState[thStateKey].path) : null}
          >
            {thState[thStateKey].name}
            {thState[thStateKey].path === sortSettings.iter
            ? <IconSVG id={sortSettings.order === 'asc' ? 'sort-ascending' : 'sort-descending'}/>
            : null}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  sortSettings: PropTypes.object.isRequired,
  setThState: PropTypes.func.isRequired,
  thState: PropTypes.object.isRequired,
}

export default TableHeader