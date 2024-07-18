import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
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
import { dispatch } from '~/redux/store'
import { StorageKeys } from '~/utils/constants'
import { FaFacebookFIcon, FaGooglePlusGIcon, InfoIcon } from '~/utils/icons'
import { signIn } from '../AuthSlice'

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const from = location.state?.from || routesConfig.home

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
      <div className='w-full lg:w-[700px] xl:w-full h-full grid xl:grid-cols-2'>
        <div className='pl-[16px] lg:pl-[32px] lg:pr-[32px] bg-[#F9F9F9] hidden xl:flex xl:flex-col
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
            className='h-[400px] object-contain'
          />
        </div>
        <div
          className='relative pl-[16px] pr-[16px] lg:pl-[32px] lg:pr-[32px] bg-white flex flex-col justify-center items-center animate-growthCenter'
        >
          <Link to={routesConfig.home} className='absolute top-[28px] md:top-[40px] left-1/2 -translate-x-1/2 xl:hidden'>
            <img src={logo} />
          </Link>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-[440px] w-full mt-[56px] md:mt-[68px] xl:mt-0'
          >
            <h1 className='text-[38px] font-semibold text-center'>Welcome back!</h1>
            <p className='mt-[10px] mb-[30px] text-center'>
              Please enter your email and password to our products!
            </p>

            <div className='flex flex-col gap-[24px] xl:gap-[16px]'>
              {searchParams.get('registeredEmail') && (
                <div className='flex items-center gap-2 p-3 rounded-md bg-blue-300/15'>
                  <p><InfoIcon className='text-[30px] text-blue-500' /></p>
                  <p className='text-[15px]'>
                    An email had been sent to <span className='font-semibold'>{searchParams.get('registeredEmail')}</span>
                    . Please check and verify your account before sign in!
                  </p>
                </div>
              )}
              {searchParams.get('verifiedEmail') && (
                <div className='flex items-center gap-2 p-3 rounded-md bg-green-300/15'>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 16 16">
                      <path fill="#00b569" d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z"></path><polygon fill="#fff" points="7,12 3.48,8.48 4.894,7.066 7,9.172 11.71,4.462 13.124,5.876"></polygon>
                    </svg>
                  </p>
                  <p className='text-[15px]'>
                    Your email <span className='font-semibold'>{searchParams.get('verifiedEmail')} </span>
                    has been verified. Now you can sign in to buy our products. Have a good day!
                  </p>
                </div>
              )}
              <TextFieldOutlined
                label='Email'
                disabled={isSubmitting}
                {...register('email')}
              />

              <PasswordFieldOutlined
                label='Password'
                disabled={isSubmitting}
                {...register('password')}
              />
            </div>

            <Button
              className='mt-[32px] xl:mt-[24px] w-full'
              type='submit'
              primary
              rounded
              disabled={isSubmitting || !isDirty}
            >
              Sign In
            </Button>

            <div className='mt-[28px] xl:mt-[20px] text-center'>
              <Link
                to={routesConfig.forgotPassword}
                className='text-[14px] font-medium text-primary-400 hover:text-primary-200 underline-run hover:after:bg-primary-200'
              >
                Forgot Password?
              </Link>
            </div>

            <div className='my-[32px] xl:my-[24px] w-full relative flex flex-col items-center justify-center'>
              <span className='h-[1px] border w-full absolute top-1/2 -translate-y-1/2'></span>
              <span className='bg-white text-[14px] relative z-10 px-3'>or</span>
            </div>

            <div className='w-full grid grid-cols-2 gap-[16px]'>
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

            <div className='mt-[28px] xl:mt-[20px] flex justify-center items-center xl:gap-[10px] text-[14px]'>
              <p>Don&apos;t have an account?</p>
              <Link
                to={routesConfig.signUp}
                className='px-[10px] !py-[12px] xl:px-0 xl:py-1 font-medium text-primary-400 hover:text-primary-200 underline-run hover:after:bg-primary-200'
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
