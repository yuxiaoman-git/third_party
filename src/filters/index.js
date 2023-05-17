/* eslint-disable */
// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

// 时间戳转换
export function formatDate(date, all) {
  if (date) {
    date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hh =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var mm =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var ss =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    if (all && all === 'all') {
      return YY + MM + DD + ' ' + hh + ':' + mm + ':' + ss
    } else if (all && all === 'hhmm') {
      return YY + MM + DD + ' ' + hh + ':' + mm
    } else {
      return YY + MM + DD
    }
  } else {
    return ''
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}
export function getfilesize(size, digits) {
  if (!size) {
    return "";
  }
  const si = [
    { value: Math.pow(1024, 4), symbol: 'T' },
    { value: Math.pow(1024, 3), symbol: 'G' },
    { value: Math.pow(1024, 2), symbol: 'M' },
    { value: Math.pow(1024, 1), symbol: 'K' },
  ]
  for (let i = 0; i < si.length; i++) {
    if (size >= si[i].value) {
      return (size / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return size.toString() + "B"
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

//码率转kbps
export function getKbps(num, digits) {
  return (num / 1024).toFixed(digits)
}

// 加法
export function accAdd(arg1 = '', arg2 = '') {
  var r1, r2, m
  try { r1 = (arg1).toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = (arg2).toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
// 减法
export function Subtr(arg1 = '', arg2 = '') {
  var r1, r2, m, n
  try { r1 = (arg1).toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = (arg2).toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
// 乘法
export function accMul(arg1 = '', arg2 = '') {
  var m = 0; var s1 = (arg1).toString(); var s2 = (arg2).toString()
  try { m += s1.split('.')[1].length } catch (e) { }
  try { m += s2.split('.')[1].length } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
// 除法
export function accDiv(arg1 = '', arg2 = '') {
  var t1 = 0; var t2 = 0; var r1; var r2
  try { t1 = (arg1).toString().split('.')[1].length } catch (e) { }
  try { t2 = (arg2).toString().split('.')[1].length } catch (e) { }
  // with (Math) {
  r1 = Number((arg1).toString().replace('.', ''))
  r2 = Number((arg2).toString().replace('.', ''))
  return accMul((r1 / r2), Math.pow(10, t2 - t1))
  // }
}