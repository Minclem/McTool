// Object.assign
const assign = (target, varArgs) => {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  
  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource != null) {
      for (var nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

const extend = (target, source, deep) => {
  for (var key in source) {
    if (deep && isPlainObject(source[key]) || isArray(source[key])) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {}
      if (isArray(source[key]) && !isArray(target[key])) target[key] = []

      extend(target[key], source[key], deep)
    } else if (source[key] !== undefined) {
      target[key] = source[key]
    }
  }
}

module.exports = {
  assign: assign,
  extend: extend
}
