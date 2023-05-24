import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({name, label, value, type, onChange}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
TextField.defaultValues = {
  type: "text"
}
TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextField
