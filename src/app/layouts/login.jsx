import React from 'react'
import { useState } from 'react'
import TextField from '../components/textField'
import './login.css'

const Login = () => {
  const [values, setValues] = useState({
    mail: '',
    password: ''
  })
  const {mail, password} = values;
  
  const changeValue = ({target}) => {
    setValues(prevState => (
      {
        ...prevState,
        [target.name]: target.value,
      }
    ))
  }

  return ( 
    <form className='form' action="">
      <TextField
        label='Login/mail:'
        name='mail'
        value={mail}
        onChange={changeValue}
      />
      <TextField
        label='Password:'
        name='password'
        value={password}
        type='password'
        onChange={changeValue}
      />
    </form>
   )
}
 
export default Login
