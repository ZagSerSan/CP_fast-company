import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

 const TableBody = ({data, thState}) => {

  const renderContent = (dataItem,thStateItem, ) => {
    if (thState[thStateItem].component) {
      const component = thState[thStateItem].component
      if (typeof component === 'function') {
        return component(dataItem)
      }
      return component
    }
    return _.get(dataItem,thState[thStateItem].path)
  }

  return (
    <tbody>
      {data.map(dataItem => 
        <tr key={dataItem._id}>
          {Object.keys(thState).map(thStateItem => (
            <td 
              key={thStateItem}
            >
              {renderContent(dataItem,thStateItem)}
            </td>
          ))}
        </tr>
      )}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  thState: PropTypes.object.isRequired,
}
 export default TableBody