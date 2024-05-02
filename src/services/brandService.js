import axios from '~/config/axiosClient'
import { getBrandsApi } from '~/apis/brandApis'

const getBrands = async (params) => {
  const { metadata } = await axios.get(getBrandsApi, {
    params
  })
  return metadata
}

export { getBrands }
