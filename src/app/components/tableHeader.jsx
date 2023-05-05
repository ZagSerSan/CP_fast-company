import React from 'react'
import PropTypes from 'prop-types'
import IconSVG from './iconSVG'

const TableHeader = ({
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
    //todo изменение иконок при сортировке

    for (let key in thState) {
      if (thState[key].sortKey === itemSortKey && thState[key].iconOrder === true) {
        console.log(`менять иконку на '${thState[key]}'`);
      }
        // console.log('if: проверка на добавление иконки по нажатому th');
        thState[key].iconOrder = thState[key].sortKey === itemSortKey ?  true : false
      // } else if (thState[key].iconOrder === true) {
        // console.log('else: поменять на активном, остальные проходят проверку if');
        // thState[key].iconOrder = thState[key].sortKey === itemSortKey ?  true : false
      // }
    }

    // itemSortKey==='profession.name'?thState.profession : thState[itemSortKey]
    // // onSetThState(prevState => {
    // //   return prevState
    // // })
    // let test = Object.entries(thState).map(value => (
      // {
      //   ...value,
      //   iconOrder: false
      // }
      // value
      // console.log(value)
    // ))

    // let test2 = {...test}
    // console.log('test2', test2)
    // let obj = {}
    // for (let i = 0; i < test.length; i++) {
    //   obj[i] = test[i]
    // }
    // console.log('obj', obj);


    // onSetThState((prevState) => (
    //   Object.keys(prevState).map(prevStateKey => (
    //     {
    //       [prevStateKey]: {
    //         ...prevState[prevStateKey],
    //         iconOrder: true
    //         // iconOrder: prevState[prevStateKey][sortKey] === itemSortKey ? !prevState[prevStateKey][iconOrder] : true
    //       }
    //     }
    //   ))
    // ))
    // onSetThState(prevState => prevState.map(thItem => {
    //   return {
    //     ...thItem,
    //     iconOrder: thItem.sortKey === itemSortKey ? !thItem.iconOrder : true
    //   }
    // }))
  }

  return (
    <thead>
        <tr>
          {/* {thState.map(item => (
            <th
              key={item.id}
              className={item.sortKey ? 'th' : ''}
              onClick={item.sortKey ? ()=>handleSort(item.sortKey) : null}
              scope="col"
            >
              {item.name}
              {item.sortKey && <IconSVG id={item.iconOrder ? 'sort-descending' : 'sort-ascending'}/>}
          </th>
          ))} */}
          {/* {Object.keys(thState).map(item => (
            <th
              key={item}
              className={thState[item].sortKey ? 'th' : ''}
              onClick={thState[item].sortKey ? ()=>handleSort(thState[item].sortKey) : null}
              scope="col"
            >
              {thState[item].name && (
                thState[item].sortKey && <IconSVG id={thState[item].iconOrder ? 'sort-descending' : 'sort-ascending'}/>
              )}
          </th>
          ))} */}
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
  // thState: PropTypes.array.isRequired,
  thState: PropTypes.object.isRequired,
  onSetThState: PropTypes.func.isRequired,
}

export default TableHeader