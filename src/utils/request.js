import axios from 'axios'
import { RequestHeaderKeys, StorageKeys } from './constants'
import { store } from '~/redux'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
})

instance.interceptors.request.use(
  function (config) {
    config.headers[RequestHeaderKeys.userId] =
      store.getState().user?.current?._id || ''
    config.headers.Authorization = 'Bearer ' + localStorage.getItem(StorageKeys.ACCESS_TOKEN)
    config.withCredentials = true
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response.data?.metadata
  },
  function (error) {
    throw new Error(error.response.data?.message)
  }
)

export default instance
