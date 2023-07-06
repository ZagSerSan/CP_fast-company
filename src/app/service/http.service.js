import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config.json'

// "apiEndPoint": "http://localhost:4000/api/v1/"
axios.defaults.baseURL = config.apiEndPoint

axios.interceptors.response.use((res) => res,
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

export default httpService
