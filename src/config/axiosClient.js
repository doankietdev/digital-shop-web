import axios from 'axios'
import { RequestHeaderKeys, StorageKeys } from '~/utils/constants'
import { dispatch, store } from '~/redux'
import { StatusCodes } from 'http-status-codes'
import { clear } from '~/pages/Auth/AuthSlice'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
})

instance.interceptors.request.use(
  function (config) {
    config.headers[RequestHeaderKeys.userId] =
      store.getState().user?.current?._id || ''
    config.headers.Authorization =
      'Bearer ' + localStorage.getItem(StorageKeys.ACCESS_TOKEN)
    config.withCredentials = true

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response) {
      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        dispatch(clear())
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

export default instance
