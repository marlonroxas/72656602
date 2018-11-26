exports.isBuffer = obj => {
  return (
    !!obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  )
}

exports.isStream = obj => {
  return (
    obj !== null && typeof obj === 'object' && typeof obj.pipe === 'function'
  )
}

exports.flat = (target, opts) => {
  opts = opts || {}
  let maxDepth = opts.maxDepth
  let output = {}

  let step = (object, prev, currentDepth) => {
    currentDepth = currentDepth || 1
    Object.keys(object).forEach(function(key) {
      let value = object[key]
      let isarray = opts.safe && Array.isArray(value)
      let type = Object.prototype.toString.call(value)
      let isbuffer = isBuffer(value)
      let isstream = isStream(value)
      let isobject = type === '[object Object]' || type === '[object Array]'

      let newKey = prev ? prev + '[' + key + ']' : key

      if (
        !isstream &&
        !isarray &&
        !isbuffer &&
        isobject &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)
      ) {
        return step(value, newKey, currentDepth + 1)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}
