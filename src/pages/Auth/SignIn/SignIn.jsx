import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
import sideImage from '~/assets/login.webp'
import logo from '~/assets/logo.png'
import {
  Button,
  DocumentTitle,
  Loading,
  PasswordField,
  TextField
} from '~/components'
import { routesConfig } from '~/config'
import { userSelector } from '~/redux/selectors'
import { dispatch } from '~/redux/store'
import { StorageKeys } from '~/utils/constants'
import { FaFacebookFIcon, FaGooglePlusGIcon } from '~/utils/icons'
import { signIn } from '../AuthSlice'
import { getCart } from '~/pages/Cart/CartSlice'

function SignIn() {
  const navigate = useNavigate()
  const user = useSelector(userSelector)

  useEffect(() => {
    const isResetPasswordSuccess = sessionStorage.getItem(
      StorageKeys.IS_RESET_PASSWORD_SUCCESS
    )
    const successfulSignUpMessage = sessionStorage.getItem(
      StorageKeys.SUCCESSFUL_SIGN_UP_MESSAGE
    )
    sessionStorage.removeItem(StorageKeys.IS_RESET_PASSWORD_SUCCESS)
    sessionStorage.removeItem(StorageKeys.SUCCESSFUL_SIGN_UP_MESSAGE)
    if (isResetPasswordSuccess) toast.success('Reset password successfully')
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

  const [disable, setDisable] = useState(false)

  const schema = yup.object({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password')
  })

  const form = useForm({
    mode: 'onBlur',
    disabled: disable,
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const {
    formState: { isSubmitting }
  } = form

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setDisable(true)
        await dispatch(signIn(data)).unwrap()
        await dispatch(getCart()).unwrap()
        sessionStorage.setItem('signIn', true)
        navigate(routesConfig.home)
      } catch (error) {
        toast.error(error?.messages[0], { autoClose: 5000 })
        form.reset()
      } finally {
        setDisable(false)
      }
    },
    [form, navigate]
  )

  return (
    <>
      <DocumentTitle title='Sign In' />
      <div className='w-full min-h-screen grid lg:grid-cols-2 text-white'>
        <div className='bg-secondary-400 p-[60px] hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-5'>
          <Link to={routesConfig.home}>
            <img src={logo} />
          </Link>
          <p className='text-[18px] xl:mb-7 mt-7 font-medium'>
            Buying online is faster than ever
          </p>
          <img
            src={sideImage}
            className='h-[440px] object-contain'
          />
        </div>
        <div className='bg-secondary-600 px-[16px] md:px-[155px] lg:p-[60px] xl:px-[155px] py-[60px] flex flex-col justify-center items-center'>
          <div className='text-center'>
            <h1 className='text-[38px] font-semibold'>Welcome back!</h1>
            <p className='mt-2.5'>
              Enter your email and password to use all of site features
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='mt-10 w-full'
          >
            <div className='flex flex-col gap-5 w-full text-[13px]'>
              <TextField
                form={form}
                name='email'
                placeholder='Email'
                outlined
                rounded
                className='!bg-secondary-400 border-secondary-200'
              />
              <PasswordField
                form={form}
                name='password'
                placeholder='Password'
                outlined
                rounded
                className='!bg-secondary-400 border-secondary-200'
              />
            </div>
            <div className='mt-4 mb-10 text-center'>
              <Link
                to={routesConfig.forgotPassword}
                className='text-[14px] text-secondary-200 font-semibold underline-run'
              >
                Forgot Password?
              </Link>
              <Button className='w-full mt-6 !bg-success-400 hover:!bg-success-200' type='submit' rounded>
                Sign In
              </Button>
            </div>
          </form>
          {isSubmitting && (
            <div className='absolute top-[24px]'>
              <Loading white />
            </div>
          )}
          <div className='w-full'>
            <div className='relative flex flex-col items-center justify-center'>
              <span className='h-[1px] border border-[rgba(53,69,133,0.4)] w-full absolute top-1/2 -translate-y-1/2'></span>
              <span className='bg-secondary-600 relative z-10 px-3'>or</span>
            </div>
            <div className='mt-[30px] mb-[36px] grid grid-cols-2 gap-[30px]'>
              <Button
                className='text-secondary-200 border-secondary-200'
                icon={<FaGooglePlusGIcon className='text-[24px]' />}
                outlined
                rounded
              >
                Google
              </Button>
              <Button
                className='text-secondary-200 border-secondary-200'
                icon={<FaFacebookFIcon className='text-[18px]' />}
                outlined
                rounded
              >
                Facebook
              </Button>
            </div>
            <div className='flex justify-center items-center gap-2.5'>
              <p>Don&apos;t have an account?</p>
              <Link to={routesConfig.signUp} className='text-secondary-200 font-semibold underline-run'>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default SignIn
