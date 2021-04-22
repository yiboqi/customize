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

//获取所有的cookies
function getAllCookies() {
  var cookies = document.cookie.split(/;\s/g);
  var cookieObj = {};
  cookies.forEach(function (item) {
    var key = item.split('=')[0];
    cookieObj[key] = item.split('=')[1];
  });
  return cookieObj;
}

export function removeAll() {
  return Cookies.remove(ActivePath)
}

//清空所有的cookies, 本方法依赖于getAllCookies()，clearCookieByKey(key)
export function clearAllCookies() {
  var keys = Object.keys(getAllCookies());
  keys.forEach(function (item) {
    clearCookieByKey(item);
  });
}
