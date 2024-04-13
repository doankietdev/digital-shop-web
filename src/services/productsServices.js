import request from '~/utils/request'
import { getProductsApi } from '~/apis/productsApis'

const getProducts = async (params = {}) => {
  return await request.get(getProductsApi, {
    params
  })
}

export { getProducts }
