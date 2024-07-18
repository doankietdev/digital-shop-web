import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { clear as clearCart } from '~/pages/Cart/CartSlice'
import { dispatch, store } from '~/redux'
import authService from '~/services/authService'
import { RequestHeaderKeys, StorageKeys } from '~/utils/constants'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
})

instance.defaults.timeout = 1000 * 60 * 10
instance.defaults.withCredentials = true

instance.interceptors.request.use(
  function (config) {
    const userId = store.getState().user?.current?._id
    const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN)
    if (userId) {
      config.headers[RequestHeaderKeys.USER_ID] = userId
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
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
    // if (error.response?.status === StatusCodes.UNAUTHORIZED) {
    //   authService.signOut()
    //     .then(() => {
    //       dispatch(clearCart())
    //       localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
    //       localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
    //     })
    // }

    if (error.response?.status === StatusCodes.GONE) {
      // refresh token
      return Promise.resolve()
    }

    return Promise.reject(error.response?.data)
  }
)

export default instance
