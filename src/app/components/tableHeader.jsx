import React from 'react'
import PropTypes from 'prop-types'
import IconSVG from './iconSVG'

const TableHeader = ({
  sortSettings,
  onSetSortSettings,
  thState,
}) => {

  const handleSort = (itemSortKey) => {
    // измен сорт кликом по активному элем (тот самый)
    if (sortSettings.iter === itemSortKey) {
      onSetSortSettings(prevState => ({...prevState, order: prevState.order==='asc'?'desc':'asc'}))
    } else {
      // измен сорт кликом по НЕактивному элем (НЕ тот самый)
      onSetSortSettings({iter: itemSortKey, order: 'asc'})
    }
    // изменение всех иконок при сортировке (активация одной из всех)
    for (let key in thState) {
      thState[key].iconOrder = thState[key].sortKey === itemSortKey ?  true : false
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys(thState).map(thStateKey => (
          <th
            key={thStateKey}
            className={thState[thStateKey].sortKey ? 'th' : ''}
            onClick={thState[thStateKey].sortKey ? ()=>handleSort(thState[thStateKey].sortKey) : null}
          >
            {thState[thStateKey].name}
            {thState[thStateKey].iconOrder && 
            <IconSVG id={sortSettings.order === 'asc' ? 'sort-ascending' : 'sort-descending'}/>}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  sortSettings: PropTypes.object.isRequired,
  onSetSortSettings: PropTypes.func.isRequired,
  thState: PropTypes.object.isRequired,
  onSetThState: PropTypes.func.isRequired,
}

export default TableHeader