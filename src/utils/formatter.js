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

export { formatCash, parseResponseMessage }
