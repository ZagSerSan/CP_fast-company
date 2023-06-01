import React, { useEffect } from 'react'
import { useState } from 'react'
import TextField from '../components/textField'
import './login.css'
import { validator } from '../utils/validator'
import { validatorConfig } from '../utils/validatorConfig'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Login = () => {
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    mail: '',
    password: ''
  })
  const { mail, password } = data

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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h2>Login</h2>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              label="Login/mail:"
              name="mail"
              value={mail}
              onChange={changeValue}
              errors={errors}
            />
            <TextField
              label="Password:"
              name="password"
              value={password}
              type="password"
              onChange={changeValue}
              errors={errors}
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
                Login
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
