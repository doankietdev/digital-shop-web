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

export { formatCash }
