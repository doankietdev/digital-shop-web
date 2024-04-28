import axios from '~/config/axiosClient'
import { getProductBySlugApi, getProductsApi } from '~/apis/productApis'
import { parsePlaceHolderUrl } from '~/utils/formatter'

const getProducts = async (params = {}) => {
  const { metadata } = await axios.get(getProductsApi, {
    params
  })
  return metadata
}

const getProductBySlug = async (slug, params = {}) => {
  const { metadata } = await axios.get(
    parsePlaceHolderUrl(getProductBySlugApi, {
      slug
    }),
    {
      params
    }
  )
  return metadata.product
}

export { getProducts, getProductBySlug }
