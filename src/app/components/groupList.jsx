import React from "react"
import PropTypes from 'prop-types';

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedProf
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map(item => (
        <li
          role='button'
          key={items[item][valueProperty]}
          className={"list-group-item" + (items[item]===selectedProf ? ' active' : '')}
          onClick={()=>onItemSelect(items[item])}
          >
            {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  )
}
GroupList.defaultProps = {
  valueProperty:'_id',
  contentProperty:'name'
}
GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedProf: PropTypes.object.isRequired,
}
export default GroupList
