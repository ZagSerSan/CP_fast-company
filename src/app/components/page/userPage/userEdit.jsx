/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
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
import CheckBoxField from '../../common/form/checkBoxField'
import IconSVG from '../../common/iconSVG'

const UserEdit = ({userId}) => {
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState()

  // all api qualities state
  const [qualities, setQualities] = useState([])
  
  useEffect(() => {
    userApi.getUserById(userId).then(data => {
      const qualitiesList = (data.qualities).map(qualitie => (
        { label: qualitie.name, value: qualitie._id }
      ))
      setData({...data, qualities: qualitiesList})
    })

    qualitiesApi.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map(qualitieName => (
        { label: data[qualitieName].name, value: data[qualitieName]._id }
      ))
      setQualities(qualitiesList)
    })

    professionsApi.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
          label: data[professionName].name,
          value: data[professionName]._id
      }))
      setProfession(professionsList)
    })
  }, [])

  // for SelectField
  const [professions, setProfession] = useState()

  // handleChange => onChange в дочерних компонентах (полях)
  const handleChange = (fieldData) => {
    setData((prevState) => (
      {
        ...prevState,
        [fieldData.name]: fieldData.value
      }
    ))
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
    console.log({
      ...data,
      professions: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
  }

  // useEffect(() => {
  //   validate()
  // }, [data])
  // const validate = () => {
  //   const errors = validator(data, validatorConfig)
  //   setErrors(errors)
  //   return Object.keys(errors).length === 0
  // }
  // блокировка кнопки
  // const isValid = Object.keys(errors).length === 0

  // console.log('data', data)
  // console.log('qualities :>> ', qualities)
  data && console.log('data.qualities', data.qualities)
  
  return (
    <div className="container mt-4">
      <div className="row">
      {data ? 
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
              name='profession'
              label="Your profession:"
              defaultOption="Change your profession..."
              value={data.profession._id}
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
              name='qualities'
              label='Change your qualities:'
              defaultValue={data.qualities}
              qualities={qualities}
              onChange={handleChange}
            />
            <button
              type="submit"
              // disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Change
            </button>
          </form>
        </div>  : <IconSVG id='loader'/>}
      </div>
    </div>
  )
}

UserEdit.propTypes = {
  userId: PropTypes.string
}

export default UserEdit

/**
          <form className="form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={data._id}
                type="password"
                onChange={handleChange}
                errors={errors}
              />
              <TextField
                label="Email"
                name="mail"
                value={data.mail}
                onChange={handleChange}
                errors={errors}
              />
              <SelectField
                name='profession'
                label="Your profession:"
                defaultOption="Choose your profession..."
                value={data.profession._id}
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
                name='qualities'
                label='Choose your qualities:'
                defaultValue={data.qualities}
                qualities={qualities}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Change
              </button>
            </form>
 */