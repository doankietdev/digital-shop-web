import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '~/redux/selectors'
import authService from '~/services/authService'

const useSignInStatusChecker = (interval = 5000) => {
  const intervalId = useRef()
  const { current: user } = useSelector(userSelector)
  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        if (user?._id) await authService.checkSignInStatus()
      } catch (error) {
        clearInterval(intervalId.current)
      }
    }
    intervalId.current = setInterval(checkSignInStatus, interval)
    return () => clearInterval(intervalId.current)
  }, [interval, user?._id])
}

export default useSignInStatusChecker
