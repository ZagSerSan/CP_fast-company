import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userService from '../service/users.service'
import localStorageService from '../service/localStorage.service'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }

})
const AuthContext = React.createContext()
export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)
  const { setTokens } = localStorageService

  async function signIn({email, password}) {
    const url = 'accounts:signInWithPassword'
    try {
      const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
      setTokens(data)
      getUserData()
      toast.info('Logging is successful!')
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  async function signUp({email, password, ...rest}) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`

    try {
      const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest
      })
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      const {code, message} = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким email уже существует.'
          }
          throw errorObject
        }
      }
    }
  }
  async function createUser(data) {
    try {
      const {content} = await userService.create(data)
      console.log(content)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }
  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])
  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }
  const getUserData = async () => {
    try {
      const { content } = await userService.getCurrentUser()
      setCurrentUser(content)
    } catch (error) {
      setError(error.response.data)
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider value={{signUp, signIn, currentUser}}>
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
