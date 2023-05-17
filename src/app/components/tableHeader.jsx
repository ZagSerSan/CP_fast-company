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
    //todo изменение всех иконок при сортировке (активация одной из всех)
    for (let key in thState) {
      thState[key].iconOrder = thState[key].path === itemSortKey ?  true : false
    }
    // console.log('itemSortKey', itemSortKey);
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
            {/* {console.log(thState[thStateKey].path)} */}
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