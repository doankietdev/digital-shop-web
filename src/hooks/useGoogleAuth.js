import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { routesConfig } from '~/config'
import { signInWithGoogle as signInWithGoogleActionCreator } from '~/pages/Auth/AuthSlice'
import { getCart } from '~/pages/Cart/CartSlice'
import { dispatch } from '~/redux'
import { StorageKeys } from '~/utils/constants'

const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || routesConfig.home

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoading(true)
      const loadingToast = toast.loading('Signing in...')
      try {
        const { clientId, accessToken, refreshToken } = await dispatch(
          signInWithGoogleActionCreator({ code: codeResponse.code })
        ).unwrap()
        localStorage.setItem(StorageKeys.CLIENT_ID, clientId)
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken)
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken)
        await dispatch(getCart()).unwrap()
        navigate(from, { replace: true })
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
        toast.dismiss(loadingToast)
      }
    },
    onError: () => {
      toast.error('Sign in failed with Google!')
    },
    flow: 'auth-code'
  })

  return [signInWithGoogle, loading]
}

export default useGoogleAuth
