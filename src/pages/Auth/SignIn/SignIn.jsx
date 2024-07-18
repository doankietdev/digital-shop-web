import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import sideImage from '~/assets/login.webp'
import logo from '~/assets/logo.png'
import {
  Button,
  DocumentTitle,
  PasswordFieldOutlined,
  TextFieldOutlined
} from '~/components'
import { routesConfig } from '~/config'
import { getCart } from '~/pages/Cart/CartSlice'
import { userSelector } from '~/redux/selectors'
import { dispatch } from '~/redux/store'
import { StorageKeys } from '~/utils/constants'
import { FaFacebookFIcon, FaGooglePlusGIcon } from '~/utils/icons'
import { signIn } from '../AuthSlice'

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(userSelector)

  const from = location.state?.from || routesConfig.home

  useEffect(() => {
    const successfulSignUpMessage = sessionStorage.getItem(
      StorageKeys.SUCCESSFUL_SIGN_UP_MESSAGE
    )
    sessionStorage.removeItem(StorageKeys.IS_RESET_PASSWORD_SUCCESS)
    sessionStorage.removeItem(StorageKeys.SUCCESSFUL_SIGN_UP_MESSAGE)
    if (successfulSignUpMessage) {
      toast.success('Sign up successfully')
      toast.success(successfulSignUpMessage, {
        autoClose: 8000
      })
    }
  }, [])

  useLayoutEffect(() => {
    if (user?.current?._id) {
      navigate(routesConfig.home)
    }
  }, [navigate, user])

  const schema = yup.object({
    email: yup.string(),
    password: yup.string()
  })

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isDirty, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(
    async (data) => {
      const loadingToast = toast.loading('Signing in...')
      try {
        const { accessToken, refreshToken } = await dispatch(signIn(data)).unwrap()
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken)
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken)
        await dispatch(getCart()).unwrap()
        navigate(from, { replace: true })
      } catch (error) {
        toast.error(error.message)
      } finally {
        toast.dismiss(loadingToast)
      }
    },
    [from, navigate]
  )

  useLayoutEffect(() => {
    setFocus('email')
  }, [setFocus])

  return (
    <>
      <DocumentTitle title='Sign In' />
      <div className='w-full grid lg:grid-cols-2'>
        <div className='bg-[#F9F9F9] p-[60px] hidden lg:flex lg:flex-col
          lg:justify-center lg:items-center gap-2'
        >
          <Link to={routesConfig.home}>
            <img src={logo} />
          </Link>
          <p className='text-[18px] xl:mb-7 mt-7 font-medium'>
            Buying online is faster than ever
          </p>
          <img
            src={sideImage}
            className='w-[700px] object-contain'
          />
        </div>
        <div
          className='bg-white px-[16px] md:px-[155px] lg:p-[60px]
            xl:px-[155px] py-[60px] flex flex-col justify-center items-center'
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full'
          >
            <div className='text-center'>
              <h1 className='text-[38px] font-semibold'>Welcome back!</h1>
              <p className='mt-[10px]'>
                Please enter your email and password to our products!
              </p>
            </div>
            <div className='mt-[28px]'>
              <TextFieldOutlined
                placeholder='Email'
                disabled={isSubmitting}
                {...register('email')}
              />
            </div>
            <div className='mt-[20px]'>
              <PasswordFieldOutlined
                placeholder='Password'
                disabled={isSubmitting}
                {...register('password')}
              />
            </div>
            <Button
              className='mt-[20px] w-full'
              type='submit'
              primary
              rounded
              disabled={isSubmitting || !isDirty}
            >
              Sign In
            </Button>
          </form>

          <div className='my-[20px] text-center'>
            <Link
              to={routesConfig.forgotPassword}
              className='text-[14px] font-medium text-primary-400 hover:text-primary-200 underline-run hover:after:bg-primary-200'
            >
              Forgot Password?
            </Link>
          </div>
          <div className='w-full'>
            <div className='relative flex flex-col items-center justify-center'>
              <span className='h-[1px] border
                w-full absolute top-1/2 -translate-y-1/2'
              >
              </span>
              <span className='bg-white text-[14px] relative z-10 px-3'>or</span>
            </div>
            <div className='mt-[30px] mb-[36px] grid grid-cols-2 gap-[30px]'>
              <Button
                icon={<FaGooglePlusGIcon className='text-[24px]' />}
                outlined
                rounded
                disabled={isSubmitting}
              >
                Google
              </Button>
              <Button
                icon={<FaFacebookFIcon className='text-[18px]' />}
                outlined
                rounded
                disabled={isSubmitting}
              >
                Facebook
              </Button>
            </div>
            <div className='flex justify-center items-center gap-2.5 text-[14px]'>
              <p>Don&apos;t have an account?</p>
              <Link
                to={routesConfig.signUp}
                className='font-medium text-primary-400 hover:text-primary-200 underline-run hover:after:bg-primary-200'
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
