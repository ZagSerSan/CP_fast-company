import React, { useEffect } from 'react'
import { useState } from 'react'
import TextField from '../components/textField'
import './login.css'
import { validator } from '../utils/validator'

const Login = () => {
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    mail: '',
    password: ''
  })
  const {mail, password} = data;
  
  const changeValue = ({target}) => {
    setData(prevState => (
      {
        ...prevState,
        [target.name]: target.value,
      }
    ))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    validate()
    const ifValid = validate()
    if (!ifValid) return
    console.log('data', data)
  }

  const validatorConfig = {
    mail: {
      isRequired: {
        message: 'Mail is required!'
      }
    },
    password: {
      isRequired: {
        message: 'Password is required!'
      }
    }
  }

  useEffect(() => {
    validate();
  }, [data])
  const validate = () => {
    const errors = validator(data,validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  return ( 
    <form className='form' onSubmit={handleSubmit}>
      <TextField
        label='Login/mail:'
        name='mail'
        value={mail}
        onChange={changeValue}
        errors={errors}
      />
      <TextField
        label='Password:'
        name='password'
        value={password}
        type='password'
        onChange={changeValue}
        errors={errors}
      />
      <button>Отправить</button>
    </form>
   )
}
 
export default Login
