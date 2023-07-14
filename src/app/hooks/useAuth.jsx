import React, { useContext } from 'react'
import PropTypes from 'prop-types'
// import { toast } from 'react-toastify'
// import userService from '../service/users.service'
import axios from 'axios'

const AuthContext = React.createContext()
export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  async function signUp({email, password}) {
    const API_KEY = 'AIzaSyAtlZvENPZ0oLRBl9r9udx_rRmhOmfOAgg'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    const {data} = await axios.post(url, {email, password, returnSecureToken: true})
    console.log(data)
  }

  return (
    <AuthContext.Provider value={{signUp}}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
