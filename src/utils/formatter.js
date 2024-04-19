const formatCash = (number) => {
  if (number === null || number === undefined) return ''
  return (
    number
      .toString()
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev
      }) + ' VND'
  )
}

const parseResponseMessage = (responseMessage) => {
  try {
    return JSON.parse(responseMessage)
  } catch (error) {
    return responseMessage
  }
}

const formatPlaceHolderUrl = (originalUrl, data = {}) => {
  const placeholderRegex = /:(\w+)/g
  const placeholderNames = Object.keys(data)

  return originalUrl.replace(placeholderRegex, (match, placeholderName) => {
    if (placeholderNames.includes(placeholderName)) {
      return data[placeholderName]
    } else {
      return match
    }
  })
}

export { formatCash, parseResponseMessage, formatPlaceHolderUrl }
