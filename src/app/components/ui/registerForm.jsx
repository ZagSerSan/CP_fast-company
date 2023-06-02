import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
// utils, css
import './formStyle.css'
import professionsApi from '../../api/fake.api/professions.api'
import { validator } from '../../utils/validator'
import { validatorConfig } from '../../utils/validatorConfig'
// components
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'

const RegisterForm = () => {
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    mail: '',
    password: '',
    profession: ''
  })

  // for SelectField
  const [professions, setProfession] = useState()
  useEffect(() => {
    professionsApi.fetchAll().then((data) => setProfession(data))
  }, [])

  const changeValue = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
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

  return (<>
    <h2>Registration</h2>
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        label="Login/mail:"
        name="mail"
        value={data.mail}
        onChange={changeValue}
        errors={errors}
      />
      <TextField
        label="Password:"
        name="password"
        value={data.password}
        type="password"
        onChange={changeValue}
        errors={errors}
      />
      <SelectField
        label='Your profession:'
        defaultOption='Choose your profession...'
        value={data.profession}
        professions={professions}
        error={errors.profession}
        changeValue={changeValue}
      />
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
          Register
        </Link>
      )}
      <p>If you have account, please <Link to='/Login'>Sign in</Link></p>
    </form>
  </>)
}

export default RegisterForm
