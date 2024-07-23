/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useLayoutEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DocumentTitle, Loading } from '~/components'
import { routesConfig } from '~/config'
import authService from '~/services/authService'

function VerifyAccount() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useLayoutEffect(() => {

  }, [navigate, searchParams])

  useEffect(() => {
    const handleVerifyAccount = async () => {
      if (!searchParams.has('email') || !searchParams.has('token')) {
        return navigate(routesConfig.pageNotFound, { replace: true })
      }

      try {
        await authService.verifyAccount({
          email: searchParams.get('email'),
          token: searchParams.get('token')
        })
        toast.success('Account verified successfully. Now you can sign in to buy our products. Have a good day!')
        navigate(`${routesConfig.signIn}?verifiedEmail=${searchParams.get('email')}`, { replace: true })
      } catch (error) {
        toast.error(error.message)
        navigate(routesConfig.signIn, { replace: true })
      }
    }
    handleVerifyAccount()
  }, [navigate, searchParams])

  return (
    <>
      <DocumentTitle title='Verifying Account' />
      <div className='flex items-center gap-4'>
        <Loading />
        <p className='font-medium text-[20px] tracking-[2px]'>
          Verifying your account...
        </p>
      </div>
    </>
  )
}

export default memo(VerifyAccount)
