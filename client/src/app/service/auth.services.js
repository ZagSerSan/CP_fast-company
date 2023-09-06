import axios from 'axios'
import localStorageService from './localStorage.service'
// import userService from './users.service'

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})
// const userEndpoint = 'user/'

const authService = {
  register: async ({email, password}) => {
    const url = `accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    })
    return data
  },
  login: async (email, password) => {
    const url = 'accounts:signInWithPassword'
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    })
    return data
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken()
    })
    return data
  },
  updateEmail: async (email) => {
    const url = `accounts:update?key=${process.env.REACT_APP_FIREBASE_KEY}`
    const idToken = localStorageService.getAccessToken()
    const { data } = await httpAuth.post(url, {idToken, email, returnSecureToken: true})
    return data
  }
}

export default authService
