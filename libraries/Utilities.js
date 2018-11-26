class Utilities {
  constructor() {
    this.makeMutableCopyOf = this.makeMutableCopyOf.bind(this)
  }

  makeMutableCopyOf(immutableObj) {
    var mutableCopy = {}
    for (var propertyKey in immutableObj) {
      mutableCopy[propertyKey] = immutableObj[propertyKey]
    }
    return mutableCopy
  }

  isJson(json) {
    return /^[\],:{}\s]*$/.test(
      json
        .replace(/\\["\\\/bfnrtu]/g, '@')
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          ']'
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    )
  }
}

module.exports = new Utilities()
