import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
// utils
import { validator } from '../../utils/validator'
import { validatorConfig } from '../../utils/validatorConfig'
// components
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'

const loginForm = () => {
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    mail: '',
    password: '',
    stayOn: false
  })
  const { mail, password } = data

  const handleChange = (fieldData) => {
    setData((prevState) => ({
      ...prevState,
      [fieldData.name]: fieldData.value
    }))
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
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          label="Login/mail:"
          name="mail"
          value={mail}
          onChange={handleChange}
          errors={errors}
        />
        <TextField
          label="Password:"
          name="password"
          value={password}
          type="password"
          onChange={handleChange}
          errors={errors}
        />
        <CheckBoxField
          value={data.stayOn}
          onChange={handleChange}
          name="stayOn"
        >
          Stay on the site.
        </CheckBoxField>
        {!isValid ? (
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
            to="/Users"
          >
            Login
          </button>
        ) : (
          <Link
            type="submit"
            className="btn btn-primary w-100 mx-auto"
            to="/Users"
          >
            Login
          </Link>
        )}
        <p className="mt-2">
          If you don`t have account, please{' '}
          <Link to="/Login/register">Register</Link>
        </p>
      </form>
    </>
  )
}

export default loginForm
