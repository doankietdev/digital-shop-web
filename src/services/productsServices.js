import axios from '~/config/axiosClient'
import { getProductsApi } from '~/apis/productsApis'

const getProducts = async (params = {}) => {
  return await axios.get(getProductsApi, {
    params
  })
}

export { getProducts }
