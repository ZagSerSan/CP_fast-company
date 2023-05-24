import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({name, label, value, type, errors, onChange }) => {
  return (
    <div className='form-row'>
      <div className='flex'>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
      {errors && <p className='form-error'>{errors[name]}</p>}
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
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

export default TextField
