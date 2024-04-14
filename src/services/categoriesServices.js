import axios from '~/config/axiosClient'
import { getCategoriesApi } from '~/apis/categoriesApis'

const getCategories = async () => {
  return await axios.get(getCategoriesApi, {
    params: {
      _fields: '-createdAt,-updatedAt'
    }
  })
}

export { getCategories }
