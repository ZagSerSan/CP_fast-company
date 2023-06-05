import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
// utils, css
import './form.module.css'
import professionsApi from '../../api/fake.api/professions.api'
import qualitiesApi from '../../api/fake.api/qualities.api'
import { validator } from '../../utils/validator'
import { validatorConfig } from '../../utils/validatorConfig'
// components
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    mail: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  // all api qualities state
  const [qualities, setQualities] = useState({})
  useEffect(() => {
    qualitiesApi.fetchAll().then((data) => setQualities(data))
    professionsApi.fetchAll().then((data) => setProfession(data))
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
  const handleSubmit = (e) => {
    e.preventDefault()
    validate()
    const ifValid = validate()
    if (!ifValid) return
    // действие кнопки отправить если формы валидны
    console.log('data', data)
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  return (
    <>
      <h2>Registration</h2>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          label="Login/mail:"
          name="mail"
          value={data.mail}
          onChange={handleChange}
          errors={errors}
        />
        <TextField
          label="Password:"
          name="password"
          value={data.password}
          type="password"
          onChange={handleChange}
          errors={errors}
        />
        <SelectField
          label="Your profession:"
          defaultOption="Choose your profession..."
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
          qualities={qualities}
          onChange={handleChange}
          name='qualities'
          label='Choose your qualities:'
        />
        <CheckBoxField
          value={data.licence}
          onChange={handleChange}
          name='licence'
          error={errors.licence}
        >
          Confirm the <a href=''>license agreement</a>.
        </CheckBoxField>
        {!isValid ? (
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Register
          </button>
        ) : (
          <Link
            
            className="btn btn-primary w-100 mx-auto"
            to="/Users"
          >
            Register
          </Link>
        )}
        <p className='mt-2'>
          If you have account, please <Link to="/Login">Sign in</Link>
        </p>
      </form>
    </>
  )
}

export default RegisterForm
