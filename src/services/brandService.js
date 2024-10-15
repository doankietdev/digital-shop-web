import axios from '~/config/axiosClient'
import apis from '~/apis'

const { getBrandsApi } = apis

const getBrands = async (params) => {
  const { metadata } = await axios.get(getBrandsApi, {
    params
  })
  return metadata
}

export { getBrands }
