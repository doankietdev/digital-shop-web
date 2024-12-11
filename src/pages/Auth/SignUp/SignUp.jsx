import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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
import { useGoogleAuth } from '~/hooks'
import authService from '~/services/authService'
import { FaFacebookFIcon, FaGooglePlusGIcon } from '~/utils/icons'

function SignUp() {
  const [apiErrors, setApiErrors] = useState([])
  const navigate = useNavigate()

  const [signInWithGoogle, signInWithGoogleLoading] = useGoogleAuth()

  const schema = yup.object({
    firstName: yup
      .string()
      .required('Please enter your first name')
      .min(1, 'First name must have at least 1 characters'),
    lastName: yup
      .string()
      .required('Please enter your last name')
      .min(2, 'Last name must have at least 2 characters'),

    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Password must have at least 6 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
      .matches(/\d/, 'Password must contain at least 1 digit')
      .matches(
        /[@$!%*?&_.]/,
        `Password must contain at least 1 special character from the following list:
          \`@\`, \`$\`, \`!\`, \`%\`, \`*\`, \`?\`, \`&\`, \`_\`, \`. \``
      ),
    passwordConfirmation: yup
      .string()
      .required('Please re-enter your password')
      .oneOf([yup.ref('password')], 'Password Confirmation does not match')
  })

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors, isDirty }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    apiErrors.forEach((apiError) => {
      setError(apiError.field, {
        type: 'custom',
        message:  apiError.message
      })
    })
  }, [apiErrors, setError])

  const onSubmit = useCallback(
    async ({ firstName, lastName, mobile, email, password }) => {
      const loadingToast = toast.loading('Signing up...')
      try {
        await authService.signUp({
          firstName,
          lastName,
          mobile,
          email,
          password
        })
        toast.success('Sign up successfully. Please check and verify your account before sign in!')
        navigate(`${routesConfig.signIn}?registeredEmail=${email}`)
      } catch (error) {
        setApiErrors(error?.metadata?.errors || [])
        toast.error(error.message)
      } finally {
        toast.dismiss(loadingToast)
      }
    },
    [navigate]
  )

  const handleGoogleButtonClick = useCallback(() => {
    signInWithGoogle()
  }, [signInWithGoogle])

  return (
    <>
      <DocumentTitle title='Sign Up' />
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
        <div className='relative pl-[16px] pr-[16px] lg:pl-[32px] lg:pr-[32px] bg-white flex flex-col justify-center items-center animate-growthCenter'
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
              Please enter your personal details to sign up
            </p>

            <div className='mt-[30px] flex flex-col gap-[24px] xl:gap-[16px]'>
              <div className='flex flex-col md:flex-row gap-[24px] xl:gap-[16px]'>
                <TextFieldOutlined
                  label='First Name'
                  disabled={isSubmitting || signInWithGoogleLoading}
                  {...register('firstName')}
                  errorMessage={errors.firstName?.message}
                  onInput={() => clearErrors('firstName')}
                />
                <TextFieldOutlined
                  label='Last Name'
                  disabled={isSubmitting || signInWithGoogleLoading}
                  {...register('lastName')}
                  errorMessage={errors.lastName?.message}
                  onInput={() => clearErrors('lastName')}
                />
              </div>
              <TextFieldOutlined
                label='Email'
                disabled={isSubmitting || signInWithGoogleLoading}
                {...register('email')}
                errorMessage={errors.email?.message}
                onInput={() => clearErrors('email')}
              />
              <div className='flex flex-col md:flex-row gap-[24px] xl:gap-[16px]'>
                <PasswordFieldOutlined
                  label='Password'
                  disabled={isSubmitting || signInWithGoogleLoading}
                  {...register('password')}
                  errorMessage={errors.password?.message}
                  onInput={() => clearErrors('password')}
                />
                <PasswordFieldOutlined
                  label='Password Confirmation'
                  disabled={isSubmitting || signInWithGoogleLoading}
                  {...register('passwordConfirmation')}
                  errorMessage={errors.passwordConfirmation?.message}
                  onInput={() => clearErrors('passwordConfirmation')}
                />
              </div>
            </div>

            <Button
              className='mt-[32px] xl:mt-[24px] w-full'
              type='submit'
              primary
              rounded
              disabled={isSubmitting || !isDirty}
            >
              Sign Up
            </Button>
            <div className='my-[32px] xl:my-[24px] w-full relative flex flex-col items-center justify-center'>
              <span className='h-[1px] border w-full absolute top-1/2 -translate-y-1/2'></span>
              <span className='bg-white text-[14px] relative z-10 px-3'>or</span>
            </div>

            <div className='w-full grid grid-cols-2 gap-[16px]'>
              <Button
                icon={<FaGooglePlusGIcon className='text-[24px]' />}
                outlined
                rounded
                disabled={isSubmitting || signInWithGoogleLoading}
                onClick={handleGoogleButtonClick}
              >
                Google
              </Button>
              <Button
                icon={<FaFacebookFIcon className='text-[18px]' />}
                outlined
                rounded
                disabled={isSubmitting || signInWithGoogleLoading}
              >
                Facebook
              </Button>
            </div>

            <div className='mt-[28px] xl:mt-[20px] flex justify-center items-center xl:gap-[10px] text-[14px]'>
              <p>Do you already have an account?</p>
              <Link
                to={routesConfig.signIn}
                className='px-[10px] !py-[12px] xl:px-0 xl:py-1 font-medium text-primary-400 hover:text-primary-200 underline-run hover:after:bg-primary-200'
              >
               Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
