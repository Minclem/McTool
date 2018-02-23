/**
 * 是否一般对象
 *
 * @param  { Mixed }   obj
 * @return { Boolean } bool
 */

function isPlainObject (obj) {
    return isObj(obj) && !(obj !== null && obj === obj.window) && Object.getPrototypeOf(obj) === Object.prototype
}

/**
 * 是否数组
 *
 * @param  { Mixed }   obj
 * @return { Boolean } bool
 */

function isArray (obj) {
    return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]'
}

/**
 * 是否定义
 *
 * @param  { Mixed }   o
 * @return { Boolean } bool
 */

function isUndefined (o) {
    return o === void 0
}

/**
 * 是否数字
 *
 * @param  { Number, String }   n
 * @return { Boolean } bool
 */

function isNumber (n) {
    return parseInt(n) === parseInt(n) && -n === -n
}

/**
 * 判断两个值是否不同
 *
 * @param  { Mixed }    a
 * @param  { Mixed }    b
 * @return { Boolean }  bool
 */

function isDiff (a, b) {
    return typeof a === typeof b ? JSON.stringify(a) !== JSON.stringify(b) : false
}

/**
 * 是否为函数
 *
 * @param  { Mixed }    fn
 * @return { Boolean }  bool
 */

function isFn (fn) {
    return typeof fn === 'function'
}

/**
 * 是否为对象（数组，对象）
 *
 * @param  { Mixed }    obj
 * @return { Boolean }  bool
 */

function isObj (obj) {
    return obj && typeof obj === 'object' ? true : false
}

/**
 * 是否为字符串
 *
 * @param  { String }    str
 * @return { Boolean }  bool
 */

function isStr (str) {
    return typeof str === 'string'
}

/**
 * 是否为邮箱
 *
 * @param  { Mixed }    str
 * @return { Boolean }  bool
 */
function isEmail (str) {
    return /^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,3}[a-z]{2,4}$/.test(str)
}

/**
 * 判断是否为 iOS
 *
 * @returns { Boolean } boolean 
 */

function iOS () {
    return (/iPhone|iPad|iPod/).test(navigator.userAgent)
}

/**
 * 判断是否为 Android
 *
 * @returns { Boolean }  boolean 
 */

function isAndroid () {
    return (/Android/).test(navigator.userAgent)
}

/**
 * 内容重复
 *
 * @returns { String }  str 
 */

function strRepeat (str, n) {
    if (!str) return ''
    if (!isNumber(n) || n <= 1) return str
    let _str = ''
    for (var i = n - 1; i >= 0; i--) _str += str
    return _str
}

/**
 * 手机号加密
 *
 * @returns { String }  phone 
 */

function encodePhone (phone) {
    if (!phone || isNumber(phone)) {
        return phone.toString().replace(/^(\d{3})(\d{4})(\d{4})/, function ($1, $2, $3, $4) {
            return [$2, strRepeat('*', $3.length), $4].join('')
        })
    } else {
        return phone || ''
    }
}

/**
 * 克隆
 *
 * @param  { Mixed }   obj
 * @return { Mixed }   obj
 */

function clone (obj) {
    if (isObj(obj)) {
        return JSON.parse(JSON.stringify(obj))
    } else {
        return isFn(obj) ? new obj : obj
    }
}

/**
 * 数值格式化
 *
 * @param   { Number } n
 * @returns { String, Number }
 */

function formatNum (n) {
    return n >= 10 ? n : '0' + n
}

/**
 * 日期格式化
 *
 * @param   { Number, Date Object } date 时间对象 或者 时间戳
 * @param   { String } format 返回的格式 time: 时间, date：日期, 默认全部显示
 * @returns { String }  返回格式后的时间字符串
 */

function formatDate (date, format) {
    // 服务端返回的时间戳可能以秒的形式
    if (date == null) return
    date = parseInt(date.toString().length < 11 ? date * 1000 : date)

    date = new Date(date)

    let y = date.getFullYear()
    let M = date.getMonth() + 1
    let d = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    M = formatNum(M)
    d = formatNum(d)
    h = formatNum(h)
    m = formatNum(m)
    s = formatNum(s)

    if (format === 'time') {
        return h + ':' + m + ':' + s
    } else if (format === 'date') {
        return y + '-' + M + '-' + d
    } else {
        return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
    }

}


export default {
    isPlainObject,
    isArray,
    isUndefined,
    isNumber,
    isDiff,
    isFn,
    isObj,
    isStr,
    isEmail,
    iOS,
    isAndroid,
    strRepeat,
    encodePhone,
    clone,
    formatNum,
    formatDate
}
