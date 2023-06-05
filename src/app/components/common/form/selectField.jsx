import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  defaultOption,
  value,
  professions,
  error,
  onChange
}) => {
  // состояние "форма была тронута"
  const [isBlured, setIsBlured] = useState(false)

  const professionsArray =
    !Array.isArray(professions) && typeof professions === 'object'
      ? Object.keys(professions).map((profession) => ({
          name: professions[profession].name,
          value: professions[profession]._id
        }))
      : professions

  const handleChange = ({ target }) => {
    onChange({name: target.name, value: target.value})
    setIsBlured(true)
  }
  const toogleBluredState = () => {
    setIsBlured(true)
  }

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>

      <select
        // className={'form-select' + (error ? ' is-invalid' : ' is-valid')}
        className={'form-select' + (!isBlured ? '' : (error ? ' is-invalid' : ' is-valid'))}
        id="validationCustom04"
        name="profession"
        value={value}
        onChange={handleChange}
        onBlur={toogleBluredState}
        required
      >
        <option disabled value="">
          {defaultOption}
        </option>

        {professionsArray &&
          professionsArray.map((profession) => (
            <option key={profession.value} value={profession.value}>
              {profession.name}
            </option>
          ))}
      </select>

      {error && (
        <div className="invalid-feedback">Please select a valid state.</div>
      )}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string,
  onChange: PropTypes.func
}

export default SelectField
