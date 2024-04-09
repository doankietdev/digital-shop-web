import request from '~/utils/request'
import { getProductsApi } from '~/apis/productsApis'

const getProducts = async (params = {}) => {
  try {
    const response = await request.get(getProductsApi, {
      params
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export { getProducts }
