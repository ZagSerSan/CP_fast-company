import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userService from '../service/users.service'
import localStorageService from '../service/localStorage.service'
import { randomInt } from '../utils/randomInt'
import IconSVG from '../components/common/iconSVG'

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

// AuthProvider
const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()
  const { setTokens } = localStorageService

  // log out
  function logOut() {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    history.push('/login')
  }

  // signIn
  async function signIn({email, password}) {
    const url = 'accounts:signInWithPassword'
    try {
      const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
      setTokens(data)
      await getUserData()
      // переадресация
      history.push(
        history.location.state
          ? history.location.state.from.pathname
          : '/users'
      )
      toast.info('Logging is successful!')
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error.message)
    }
  }

  // signUp
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

  // вспомогательные функции
  async function createUser(data) {
    try {
      const {content} = await userService.create(data)
      console.log(content)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }
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
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{logOut, signUp, signIn, currentUser}}>
      {!isLoading ? children : <IconSVG id='loader'/>}
    </AuthContext.Provider>
  )
}

// ------------------------
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
