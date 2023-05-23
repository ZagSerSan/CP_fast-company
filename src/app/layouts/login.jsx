import React from 'react'
import './login.css'

const Login = () => {
  return ( 
    <form className='form' action="">
      <div className='form-row'>
        <label htmlFor='login'>Login:</label>
        <input type="text" id='login'/>
      </div>
      <div className='form-row'>
        <label htmlFor='password'>Password:</label>
        <input type="password" id='password'/>
      </div>
    </form>
   )
}
 
export default Login