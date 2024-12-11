import { PRODUCT_CONDITIONS_TO_CHECK } from '~/utils/constants'

const checkTrendingProduct = (product = {}) => {
  return (
    product.sold >= PRODUCT_CONDITIONS_TO_CHECK.SOLD &&
    product.averageRatings >= PRODUCT_CONDITIONS_TO_CHECK.FAVORITE_RATING
  )
}

const checkBestSellerProduct = (product = {}) => {
  return product.sold >= PRODUCT_CONDITIONS_TO_CHECK.SOLD
}

const checkFavoriteProduct = (product = {}) => {
  return product.averageRatings >= PRODUCT_CONDITIONS_TO_CHECK.FAVORITE_RATING
}

const checkNewProduct = (product = {}) => {
  const createdDate = new Date(product.createdAt)
  const nowDate = new Date()
  const diffTime = Math.abs(nowDate - createdDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= PRODUCT_CONDITIONS_TO_CHECK.NEW_DISTANCE_DAY
}

const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

const getDirtiedReactHookFormDta = (dirtyFields = {}, data = {}) => Object.keys(dirtyFields).reduce((acc, field) => ({ ...acc, [field]: data[field] }), {})

const debounceEvent = (fn, delay = 0) => {
  let timerId = null
  return (e) => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    timerId = setTimeout(() => {
      fn(e)
    }, delay)
  }
}

export {
  checkBestSellerProduct,
  checkFavoriteProduct,
  checkNewProduct, checkTrendingProduct, isNumeric,
  getDirtiedReactHookFormDta,
  debounceEvent
}

