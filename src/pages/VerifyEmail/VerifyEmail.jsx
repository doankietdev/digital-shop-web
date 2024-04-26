import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BouceLoading } from '~/components'
import { routesConfig } from '~/config'
import { dispatch } from '~/redux'
import { verifyEmail } from '../Auth/AuthSlice'

function VerifyEmail() {
  const { userId, token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        await dispatch(verifyEmail({ userId, token })).unwrap()
        navigate(routesConfig.emailVerificationSuccess)
      } catch (error) {
        navigate(routesConfig.emailVerificationError)
      }
    }
    handleVerifyEmail()
  }, [navigate, token, userId])

  return (
    <div
      className={clsx(
        'bg-secondary-400 flex justify-center items-center h-screen bg-cover bg-no-repeat'
      )}
    >
      <h3 className='font-semibold text-2xl tracking-[2px] text-white mr-4'>
        Verifying email
      </h3>
      <BouceLoading className='bg-white w-[10px] h-[10px] relative top-[5px]' />
    </div>
  )
}

export default VerifyEmail
