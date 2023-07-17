const ID_TOKEN = 'idToken'
const REFRESH_TOKEN = 'refreshToken'
const EXPIRES_IN = 'expiresIn'

export function setTokens({idToken, refreshToken, expiresIn = 3600}) {
  const expiresDate = new Date().getTime() + (expiresIn * 1000)
  localStorage.setItem(ID_TOKEN, idToken)
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  localStorage.setItem(EXPIRES_IN, expiresDate)
}
export function getAccessToken() {
  return localStorage.getItem(ID_TOKEN)
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN)
}
export function getTokenExpirensData() {
  return localStorage.getItem(EXPIRES_IN)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpirensData
}

export default localStorageService
