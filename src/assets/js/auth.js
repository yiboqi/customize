import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ActivePath = 'activePath'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getaAtivePath() {
  return Cookies.get(ActivePath)
}

export function setActivePath(activePath) {
  return Cookies.set(ActivePath, activePath)
}
export function removeActivePath() {
  return Cookies.remove(ActivePath)
}
