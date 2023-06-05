import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const MultiSelectField = ({ qualities, onChange, name, label }) => {
  const qualitiesArray =
    !Array.isArray(qualities) && typeof qualities === 'object'
      ? Object.keys(qualities).map(qualitie => (
        {
          label: qualities[qualitie].name,
          value: qualities[qualitie]._id
        }))
      : qualities
  
  const handleChange = (value) => {
    onChange({name, value})
  }

  return (
    <div className="mb-4">
      <label className="form-label">
        {label}
      </label>

      <Select
        isMulti
        closeMenuOnSelect={false}
        name={name}
        options={qualitiesArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </div>

  )
}

MultiSelectField.propTypes = {
  qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
}

export default MultiSelectField
