import React from 'react'
import PropTypes from 'prop-types'
import "bootstrap/dist/css/bootstrap.css"

const TextField = ({name, label, value, type, errors, onChange }) => {
  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={"form-control" + (errors[name] ? " is-invalid" : " is-valid")}
      />
      {errors && <div className='invalid-feedback'>{errors[name]}</div>}
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
