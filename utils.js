/**
 * 是否为ie8/9
 * @returns {boolean}
 */

function isIe89 () {
    return /MSIE (8|9)\.0/.test(navigator.userAgent)
}

/**
 * 是否为整数(字符串数值亦可)
 * @param n
 * @returns {boolean}
 */

function isInt (n) {
    return /^[0-9]+$/.test(n)
}

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
 * 是否为链接
 * @param str
 * @returns {boolean}
 */

function isUrl (str) {
    return /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?$/.test(str)
}

/**
 * 是否为手机(只进行以1开头的11位数验证， 防止出现问题，如发行新的手机段)
 * @param str
 * @returns {boolean}
 */

function isPhone (str) {
    return /^1\d{10}$/.test(str)
}

/**
 * 判断是否为 iOS
 *
 * @returns { Boolean } boolean 
 */

function isIOS () {
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
 * 是否中文名称
 * @param str
 * @returns {boolean}
 */

function isChinese (str) {
    return /^[\u4e00-\u9fa5·]+$/.test(str)
}

/**
 * 是否英文名称
 * @param str
 * @returns {boolean}
 */

function isEnglish (str) {
    return /^[a-zA-Z\\s]+/.test(str)
}

/**
 * 是否为护照
 * @param str
 * @returns {boolean}
 */

function isPassport (str) {
    return /^[a-zA-Z0-9]{5,17}$/.test(str)
}

/**
 * 是否为身份证
 * @param str
 * @returns {boolean}
 */

function isIdCard (str) {
    return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(str)
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

/**
 * 获取文件路径
 * @param file
 * @returns {*}
 */

function getObjectURL (file) {
    var url = null

    if (window.URL) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL) {
        url = window.webkitURL.createObjectURL(file)
    } else {
        file.select()
        file.blur()
        url = document.selection.createRange().text
    }

    return url
}

/**
 * 获取文件拓展名
 * @param obj
 * @returns {string}
 */

function getFileExt (obj) {
    return obj.value.substr(obj.value.lastIndexOf('.')).toLowerCase()
}


export default {
    isInt,
    isIe89,
    isPlainObject,
    isArray,
    isUndefined,
    isNumber,
    isDiff,
    isFn,
    isObj,
    isStr,
    isPhone,
    isEmail,
    isUrl,
    isIOS,
    isAndroid,
    isChinese,
    isEnglish,
    isPassport,
    isIdCard,
    strRepeat,
    encodePhone,
    clone,
    formatNum,
    formatDate,
    getObjectURL,
    getFileExt
}
