import axios from '~/config/axiosClient'
import { getCategoriesApi } from '~/apis/categoryApis'

const getCategories = async () => {
  const { metadata } = await axios.get(getCategoriesApi, {
    params: {
      _fields: '-createdAt,-updatedAt'
    }
  })
  return metadata
}

export { getCategories }
