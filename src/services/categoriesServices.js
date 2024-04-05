import request from '~/utils/request'
import { getCategoriesApi } from '~/apis/categoriesApis'

const getCategories = async () => {
  try {
    const response = await request.get(getCategoriesApi, {
      params: {
        _fields: '-createdAt,-updatedAt'
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export { getCategories }
