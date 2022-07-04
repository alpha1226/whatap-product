function isNumber(str) {
  if (typeof str !== 'number') {
    const strAsNumber = Number.parseInt(str, 10)
    if (strAsNumber.toString().length !== str.length) {
      return false
    }
    if (Number.isNaN(strAsNumber)) {
      return false
    }
  }
  return true
}

module.exports = { isNumber }
