import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import { httpAuth } from '../hooks/useAuth'

// "apiEndPoint": "http://localhost:4000/api/v1/"
const http = axios.create({
  baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      const expiresData = localStorageService.getTokenExpirensData()
      const refreshToken = localStorageService.getRefreshToken()
      if (refreshToken && expiresData < Date.now()) {
        const {data} = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        localStorageService.setTokens({
          localId: data.user_id,
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in
        })
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)
const transformData = (data) => {
  return data && !data._id
    ? Object.keys(data).map(key => ({
      ...data[key]
    }))
    : data
}
http.interceptors.response.use((res) => {
  if (configFile.isFirebase) {
    res.data = {content: transformData(res.data)}
  }
  return res
},
function (error) {
  // условие для отлавливания ожидаемой ошибки (см коды статусов http)
  const expectedErrors = 
  error.response &&
  error.response.status >= 400 &&
  error.response.status < 500
  if (!expectedErrors) {
    console.log('error :>> ', error)
    // неожидаемые ошибки
    toast.error('Something was wrong. Try it later.')
  }
  return Promise.reject(error)
})

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}

export default httpService
