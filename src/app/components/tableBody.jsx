import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const TableBody = ({ data, thState }) => {
  const renderContent = (dataItem, thStateItem) => {
    if (thState[thStateItem].component) {
      const component = thState[thStateItem].component
      if (typeof component === 'function') {
        return component(dataItem)
      }
      return component
    } // при итерации имени делаем ссылку на стр пользователя по ид
    else if (thState[thStateItem].path === 'name') {
      const userId = `Users/${dataItem._id}`
      return <Link to={userId}>{dataItem.name}</Link>
    } // при итерации оценки добавляем строку '/5'
    else if (thState[thStateItem].path === 'rate') {
      return `${_.get(dataItem, thState[thStateItem].path)} / 5`
    }
    // во всех остальных случаях возвр просто path
    return _.get(dataItem, thState[thStateItem].path)
  }

  return (
    <tbody>
      {data.map((dataItem) => (
        <tr key={dataItem._id}>
          {Object.keys(thState).map((thStateItem) => (
            <td key={thStateItem}>{renderContent(dataItem, thStateItem)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  thState: PropTypes.object.isRequired
}

export default TableBody
