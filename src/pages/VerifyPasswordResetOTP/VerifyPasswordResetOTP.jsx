import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import otpIcon from '~/assets/otp-icon.png'
import { Button, Card, DocumentTitle, NumberFieldOutlined, SecondCountDown } from '~/components'
import { routesConfig } from '~/config'
import authService from '~/services/authService'
import { GrSendIcon } from '~/utils/icons'

function VerifyPasswordResetOTP() {
  const [isTimeout, setIsTimeout] = useState(false)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!searchParams.get('email') || !searchParams.get('expiresAt')) {
      navigate(routesConfig.signIn)
    }
  }, [navigate, searchParams])

  const secondsToCountDown = useMemo(() => {
    const expiresAt = Number(searchParams.get('expiresAt'))
    if (!expiresAt) return navigate(routesConfig.signIn)

    const msDuration = expiresAt - Date.now()
    if (msDuration <= 0) return navigate(routesConfig.signIn)

    return msDuration / 1000
  }, [navigate, searchParams])

  const schema = yup.object({
    otp: yup
      .string()
      .required('Please enter OTP')
      .matches(/^[0-9]+$/, 'OTP must be only digits')
      .min(6, 'OTP must be at least 6 digits')
      .max(6, 'OTP must have a maximum of 6 digits')
  })

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      otp: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(
    async ({ otp }) => {
      const loadingToast = toast.loading('Verifying OTP...')
      try {
        await authService.verifyPasswordResetOtp({
          otp,
          email: searchParams.get('email')
        })
        navigate(routesConfig.resetPassword, {
          replace: true,
          state: { email: searchParams.get('email') }
        })
      } catch (error) {
        toast.error(error.message)
      } finally {
        toast.dismiss(loadingToast)
      }
    },
    [navigate, searchParams]
  )

  // auto submit when form is valid
  useEffect(() => {
    isValid && handleSubmit(onSubmit)()
  }, [handleSubmit, isValid, onSubmit])

  const handleResendOtp = useCallback(async () => {
    const loadingToast = toast.loading('Resending OTP...')
    try {
      const { expiresAt } = await authService.forgotPassword({ email: searchParams.get('email') })

      searchParams.set('expiresAt', expiresAt)
      setSearchParams(searchParams)

      toast.success('OTP has been resent to your email.')
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.dismiss(loadingToast)
    }
  }, [searchParams, setSearchParams])

  const handleTimeout = useCallback(() => {
    setIsTimeout(true)
  }, [])

  useLayoutEffect(() => setFocus('otp'), [setFocus])

  return (
    <>
      <DocumentTitle title='Verify OTP' />
      <Card className='animate-growthCenter max-w-[520px] w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center relative p-4 md:p-10 lg:p-15'>
          <h2 className='text-center text-[20px] md:text-[24px] tracking-[2px] font-semibold'>
              Verify OTP
          </h2>
          <img src={otpIcon} className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain' />
          <p className='mb-[20px] text-[14px] text-center'>
              OTP code has been sent to <span className='font-semibold'>{searchParams.get('email')}</span>. Please check your email and
              enter OTP code below!
          </p>
          <div className='mb-[20px] w-full flex gap-3 items-center'>
            <div className='flex-1'>
              <NumberFieldOutlined
                placeholder='XXXXXX'
                maxLength={6}
                label='OTP'
                {...register('otp')}
                inputClassName='tracking-[4px] font-semibold'
              />
            </div>
            <SecondCountDown primary initialSeconds={secondsToCountDown} onTimeout={handleTimeout} />
          </div>
          <Button
            type='submit'
            primary
            rounded
            startIcon={<GrSendIcon className='text-[18px]' />}
            disabled={!isValid || isSubmitting || isTimeout}
            className='w-full'
          >
            Send
          </Button>

          <div className='mt-[20px] text-[14px] font-semibold text-center'>
            <span className='mr-1'>Didn&apos;t receive OTP?</span>
            <span
              className='cursor-pointer p-1 text-primary-400 hover:text-primary-200 underline-run hover:after:bg-primary-200'
              onClick={handleResendOtp}
            >
                Resend OTP
            </span>
          </div>
        </form>
      </Card>
    </>
  )
}

export default VerifyPasswordResetOTP
