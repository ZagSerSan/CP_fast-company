import React from 'react'
import { useState } from 'react'
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
      <div className='form-row'>
        <label htmlFor='login'>Login:</label>
        <input type="text" id='login' name='mail' value={mail} onChange={changeValue}/>
      </div>
      <div className='form-row'>
        <label htmlFor='password'>Password:</label>
        <input type="password" id='password' name='password' value={password} onChange={changeValue}/>
      </div>
    </form>
   )
}
 
export default Login