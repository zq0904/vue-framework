// 添加cookie  timestamp 到期日时间戳 默认值一年后
export const setCookie = (name, val, timestamp = Date.now() + 1000 * 60 * 60 * 24 * 365) => {
  const t = new Date(timestamp)
  document.cookie = name + '=' + val + ';' + 'expires=' + t.toUTCString()
}
// 获取cookie
export const getCookie = name => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}
// 删除cookie
export const delCookie = name => {
  if (getCookie(name) !== null) {
    document.cookie = name + '=;'
  }
}
