import apis from '~/apis'
import axios from '~/config/axiosClient'
import { parsePlaceHolderUrl } from '~/utils/formatter'

const { getCategoriesApi, getCategoryBySlugApi } = apis

const getCategories = async () => {
  const { metadata } = await axios.get(getCategoriesApi, {
    params: {
      _fields: '-createdAt,-updatedAt'
    }
  })
  return metadata
}

const getCategoryBySlug = async (slug, params) => {
  const { metadata } = await axios.get(
    parsePlaceHolderUrl(getCategoryBySlugApi, {
      slug
    }),
    {
      params: {
        ...params,
        _fields: '-createdAt,-updatedAt'
      }
    }
  )
  return metadata.category
}

export { getCategories, getCategoryBySlug }
