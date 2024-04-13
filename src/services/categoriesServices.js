import { getCategoriesApi } from '~/apis/categoriesApis'
import request from '~/utils/request'

const getCategories = async () => {
  return await request.get(getCategoriesApi, {
    params: {
      _fields: '-createdAt,-updatedAt'
    }
  })
}

export { getCategories }
