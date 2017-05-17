const emptyArray = []
const slice = emptyArray.slice
const some = emptyArray.some
const every = emptyArray.every
const emptyObj = {}
const spaceRe = /\s+/g
const readyRE = /complete|loaded|interactive/

function classRE (name) {
  return name in emptyObj
    ? emptyObj[name] : (emptyObj[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
}
function isObject (obj) {
  return typeof obj === 'object'
}
class DOM {
  constructor () {
    this.init = this.init.bind(this)
  }
  isObject = isObject
  trim (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
  }
  init (selector) {
    let dom
    if (!selector) return this
    if (typeof selector === 'string') {
      selector = selector.trim()
      return this.D(
        slice.call(
          document.querySelectorAll(selector)
        ), selector
      )
    }
    if (isObject(selector)) {
      dom = [selector]
      selector = null
    }
    return this.D(dom, selector)
  }
  hasClass (cls) {
    if (!cls) return false
    return some.call(this, function (el) {
      return this.test(el.className)
    }, classRE(cls))
  }
  addClass (cls) {
    return this.setClass(cls, 'add')
  }
  removeClass (cls) {
    return this.setClass(cls, 'remove')
  }
  setClass (cls, ty) {
    if (!cls || !ty) return this
    return this.each((idx) => {
      cls.split(spaceRe).forEach((name) => {
        let _has = this.init(this[idx]).hasClass(name)
        if (ty === 'add' ? !_has : _has) this[idx].classList[ty](name)
      }, this)
    })
  }
  D (dom, selector) {
    dom = dom || []
    Object.setPrototypeOf(dom, Object.getPrototypeOf(this))
    dom.selector = selector || ''
    return dom
  }
  each (callback) {
    every.call(this, function (el, idx) {
      return callback.call(el, idx, el) !== false
    })
    return this
  }
  ready (callback) {
    if (readyRE.test(document.readyState) && document.body) {
      callback()
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        callback()
      }, false)
    }
    return this
  }
}

export default new DOM().init
