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

export {
  checkTrendingProduct,
  checkBestSellerProduct,
  checkFavoriteProduct,
  checkNewProduct
}
