import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 设置localStorage
export function setStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}
// 获取localStorage
export function getStorage(key) {
  var json = localStorage.getItem(key)
  const dataObj = JSON.parse(json)
  if (dataObj) {
    if (dataObj.time) {
      const newDate = new Date().getTime()
      if (newDate - dataObj.time > 3000) {
        // console.log("信息已过期");
        stoRemove(key)
      } else {
        return dataObj
      }
    } else {
      return dataObj
    }
  }
}

// 删除localStorage某个key
export function stoRemove(key) {
  localStorage.removeItem(key)
}

// 清空localStorage
export function stClear() {
  localStorage.clear()
}
