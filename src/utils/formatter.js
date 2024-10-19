import moment from 'moment'

const formatCashVi = (number) => {
  if (number === null || number === undefined) return ''
  return new Intl.NumberFormat('vi-Vn', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    currencyDisplay: 'code'
  }).format(number)
}

const formatCashEn = (number) => {
  if (number === null || number === undefined) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    currencyDisplay: 'code'
  }).format(number)
}

const formatCash = (number) => {
  const language = localStorage.getItem('language') || 'vi'
  if (language === 'vi') {
    return formatCashVi(number)
  } else {
    return formatCashEn(number)
  }
}

const parseResponseMessage = (responseMessage) => {
  try {
    return JSON.parse(responseMessage)
  } catch (error) {
    return responseMessage
  }
}

const parsePlaceHolderUrl = (originalUrl, data = {}) => {
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

const removeDiacritics = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const convertObjectToArrayValues = (obj) => {
  return Object.keys(obj).map((key) => obj[key])
}

const convertMsToHumanizeTime = (ms = 0) => moment.duration(ms).humanize()

export {
  formatCash,
  parseResponseMessage,
  parsePlaceHolderUrl,
  removeDiacritics,
  convertObjectToArrayValues,
  convertMsToHumanizeTime
}
