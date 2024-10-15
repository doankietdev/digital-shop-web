import axios from '~/config/axiosClient'
import apis from '~/apis'
import { parsePlaceHolderUrl } from '~/utils/formatter'
import { currencyMap } from '~/utils/constants'

const language = localStorage.getItem('language') || 'vi'

const currency = currencyMap[language]

const { getProductBySlugApi, getProductsApi, searchProductsApi } = apis

const getProducts = async (params = {}) => {
  const { metadata } = await axios.get(`${getProductsApi}?_currency=${currency}`, {
    params
  })
  return metadata
}

const searchProducts = async (params = { q: '' }) => {
  const { metadata } = await axios.get(`${searchProductsApi}?_currency=${currency}`, {
    params
  })
  return metadata
}

const getProductBySlug = async (slug, params = {}) => {
  const { metadata } = await axios.get(
    parsePlaceHolderUrl(`${getProductBySlugApi}?_currency=${currency}`, {
      slug
    }),
    {
      params
    }
  )
  return metadata.product
}

export { getProducts, getProductBySlug, searchProducts }
