import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
// utils, css
import './userEdit.module.css'
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
// components
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import IconSVG from '../../common/iconSVG'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities'
import { getProfessions } from '../../../store/professions'
import { getCurrentUserData, updateUser } from '../../../store/users'

const UserEdit = ({ currentUserId, edit }) => {
  const history = useHistory()
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const professions = useSelector(getProfessions())
  const dispatch = useDispatch()

  const currentUser = useSelector(getCurrentUserData())

  const [data, setData] = useState(currentUser)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (edit && currentUserId !== currentUser._id) {
      history.replace(`/users/${currentUser._id}/edit`)
    }
  }, [])

  const handleChange = (fieldData) => {
    setData((prevState) => ({
      ...prevState,
      [fieldData.name]: fieldData.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return
    dispatch(updateUser(data))
    history.replace(`/Users/${currentUser._id}`)
  }

  const backWithoutSave = () => {
    history.replace(`/Users/${currentUserId}`)
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  function getQuality(ids) {
    const qualitiesArray = ids.map(id => {
      return qualities.find(q => q._id === id)
    })
    return qualitiesArray
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        {!qualitiesLoading ? (
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form className="form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={data.name}
                type="text"
                onChange={handleChange}
                errors={errors}
              />
              <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                errors={errors}
              />
              <SelectField
                name="profession"
                label="Your profession:"
                defaultOption="Change your profession..."
                value={data.profession}
                professions={professions}
                error={errors.profession}
                onChange={handleChange}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
              />
              <MultiSelectField
                name="qualities"
                label="Change your qualities:"
                defaultValue={getQuality(currentUser.qualities)}
                qualities={qualities}
                onChange={handleChange}
              />
              <div className="w-100 d-flex justify-content-between">
                <button
                  className="btn btn-secondary mx-auto"
                  onClick={backWithoutSave}
                >
                  Back without save
                </button>
                <button
                  disabled={!(Object.keys(errors).length === 0)}
                  type="submit"
                  className="btn btn-primary mx-auto"
                >
                  Save and back
                </button>
              </div>
            </form>
          </div>
        ) : (
          <IconSVG id="loader"/>
        )}
      </div>
    </div>
  )
}

UserEdit.propTypes = {
  currentUserId: PropTypes.string,
  edit: PropTypes.string
}

export default UserEdit
