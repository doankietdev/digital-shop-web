import axios from '~/config/axiosClient'
import { getProductsApi } from '~/apis/productApis'

const getProducts = async (params = {}) => {
  const { metadata } = await axios.get(getProductsApi, {
    params
  })
  return metadata
}

export { getProducts }
