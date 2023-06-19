/* eslint-disable */
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import PropTypes from 'prop-types'
// utils, css
import './userEdit.module.css'
import userApi from '../../../api/fake.api/user.api'
import professionsApi from '../../../api/fake.api/professions.api'
import qualitiesApi from '../../../api/fake.api/qualities.api'
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
// components
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import IconSVG from '../../common/iconSVG'

const UserEdit = ({ userId }) => {
  let history = useHistory()
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState()

  // all api qualities state
  const [qualities, setQualities] = useState([])
  // for SelectField
  const [professions, setProfessions] = useState()

  useEffect(() => {
    userApi.getUserById(userId).then((data) => {
      const qualitiesList = data.qualities.map((qualitie) => ({
        label: qualitie.name,
        value: qualitie._id
      }))
      setData({
        ...data,
        profession: data.profession._id,
        qualities: qualitiesList
      })
    })
    qualitiesApi.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((qualitieName) => ({
        label: data[qualitieName].name,
        value: data[qualitieName]._id,
        color: data[qualitieName].color
      }))
      setQualities(qualitiesList)
    })

    professionsApi.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })
  }, [])

  // handleChange => onChange в дочерних компонентах (полях)
  const handleChange = (fieldData) => {
    setData((prevState) => ({
      ...prevState,
      [fieldData.name]: fieldData.value
    }))
  }

  // действие кнопки отправить если формы валидны
  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const ifValid = validate()
    if (!ifValid) return

    // действие кнопки отправить если формы валидны
    const { profession, qualities } = data
    // console.log({
    //   ...data,
    //   professions: getProfessionById(profession),
    //   qualities: getQualities(qualities)
    // })
    userApi.update(userId, {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
    history.replace(`/Users/${userId}`)
  }

  const backWithoutSave = () => {
    history.replace(`/Users/${userId}`)
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        {data ? (
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
                defaultValue={data.qualities}
                qualities={qualities}
                onChange={handleChange}
              />
              <div className='w-100 d-flex justify-content-between'>
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
          <IconSVG id="loader" />
        )}
      </div>
    </div>
  )
}

UserEdit.propTypes = {
  userId: PropTypes.string
}

export default UserEdit
