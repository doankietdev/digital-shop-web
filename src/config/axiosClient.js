import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { clear as clearUser } from '~/pages/Auth/AuthSlice'
import { clear as clearCart } from '~/pages/Cart/CartSlice'
import { dispatch, store } from '~/redux'
import authService from '~/services/authService'
import { RequestHeaderKeys, StorageKeys } from '~/utils/constants'
import globalRouter from '~/utils/globalRouter'
import routesConfig from './routesConfig'
import { toast } from 'react-toastify'

let toastId = null

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
})

instance.defaults.timeout = 1000 * 60 * 10
instance.defaults.withCredentials = true

instance.interceptors.request.use(
  function (config) {
    const clientId = localStorage.getItem(StorageKeys.CLIENT_ID)
    const userId = store.getState().user?.current?._id
    const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN)
    if (clientId) {
      config.headers[RequestHeaderKeys.CLIENT_ID] = clientId
    }
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

let refreshTokenPromise = null

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  async function (error) {
    if (error.response?.status === StatusCodes.NOT_FOUND) {
      globalRouter.navigate(routesConfig.pageNotFound)
    }

    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      // sign out
      dispatch(clearUser())
      dispatch(clearCart())
      localStorage.removeItem(StorageKeys.CLIENT_ID)
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
      localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
      if (!toast.isActive(toastId)) {
        toastId = toast.error('Sign in session has expired. Please sign in again!')
      }
      globalRouter.navigate(routesConfig.signIn)
    }

    const originalRequest = error.config
    if (error.response?.status === StatusCodes.GONE && originalRequest) {
      if (!refreshTokenPromise) {
        const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN)
        refreshTokenPromise = authService.refreshToken({ refreshToken })
          .then(({ clientId, accessToken, refreshToken }) => {
            localStorage.setItem(StorageKeys.CLIENT_ID, clientId)
            localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken)
            localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken)
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          })
          .catch((_error) => {
            // sign out
            dispatch(clearUser())
            dispatch(clearCart())
            localStorage.removeItem(StorageKeys.CLIENT_ID)
            localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
            localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
            if (!toast.isActive(toastId)) {
              toastId = toast.error('Sign in session has expired. Please sign in again!')
            }
            globalRouter.navigate(routesConfig.signIn)
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      // refresh token success then call back failed requests
      return refreshTokenPromise.then(() => {
        // Add cache control headers to force bypassing cache
        originalRequest.headers['Cache-Control'] = 'no-cache'
        originalRequest.headers['Pragma'] = 'no-cache'
        return instance(originalRequest)
      })
    }

    return Promise.reject(error.response?.data)
  }
)

export default instance
