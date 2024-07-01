import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
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
import { FaFacebookFIcon, FaGooglePlusGIcon } from '~/utils/icons'
import { signUp } from '../AuthSlice'
import { StatusCodes } from 'http-status-codes'
import { StorageKeys } from '~/utils/constants'

const fieldNameLabels = {
  firstName: 'first name',
  lastName: 'last name',
  mobile: 'phone number',
  email: 'email',
  password: 'password'
}

function SignUp() {
  const [disable, setDisable] = useState(false)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const user = useSelector(userSelector)

  useEffect(() => {
    if (user?.current?._id) {
      navigate(routesConfig.home)
    }
  }, [navigate, user])

  const schema = yup.object({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup
      .string()
      .min(2, 'Last name must have at least 2 characters')
      .required('Please enter your last name'),
    mobile: yup
      .string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Please enter your phone number'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter your email'),
    password: yup
      .string()
      .min(6, 'Password must have at least 6 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
      .matches(/\d/, 'Password must contain at least 1 digit')
      .matches(
        /[@$!%*?&_.]/,
        `Password must contain at least 1 special character from the following list:
          \`@\`, \`$\`, \`!\`, \`%\`, \`*\`, \`?\`, \`&\`, \`_\`, \`. \``
      )
      .required('Please enter your password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password does not match')
      .required('Please re-enter your password')
  })

  const form = useForm({
    mode: 'onBlur',
    disabled: disable,
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  })

  const {
    formState: { isSubmitting }
  } = form

  useEffect(() => {
    errors.forEach((error) => {
      form.setError(error.field, {
        type: 'custom',
        message:  `This ${fieldNameLabels[error.field]} ${error.message}`
      })
    })
  }, [errors, form])

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setDisable(true)
        const { message } = await dispatch(signUp(data)).unwrap()
        sessionStorage.setItem(StorageKeys.SUCCESSFUL_SIGN_UP_MESSAGE, message)
        navigate(routesConfig.signIn)
      } catch (error) {
        if (error.statusCode === StatusCodes.CONFLICT) {
          setErrors(error.messages)
        } else {
          toast.error(error.messages[0], { autoClose: 5000 })
        }
      } finally {
        setDisable(false)
      }
    },
    [navigate]
  )

  return (
    <>
      <DocumentTitle title='Sign Up' />
      <div className='w-full min-h-screen grid lg:grid-cols-2 text-white'>
        <div className='bg-secondary-400 p-[60px] hidden lg:flex lg:flex-col
          lg:justify-center lg:items-center lg:gap-5'
        >
          <Link to={routesConfig.home}>
            <img src={logo} />
          </Link>
          <p className='text-[18px] xl:mb-7 mt-7 font-medium'>
            Buying online is faster than ever
          </p>
          <img src={sideImage} className='h-[440px] object-contain' />
        </div>
        <div className='bg-secondary-600 px-[16px] md:px-[155px] lg:p-[60px]
          xl:px-[155px] py-[60px] flex flex-col justify-center items-center'
        >
          <div className='text-center'>
            <h1 className='text-[38px] font-semibold'>Welcome back!</h1>
            <p className='mt-2.5'>
              Enter your personal details to use all of site features
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='mt-10 w-full'
          >
            <div className='flex flex-col gap-5 w-full text-[13px]'>
              <TextField
                form={form}
                name='firstName'
                placeholder={fieldNameLabels.firstName}
                outlined
                rounded
                className='!bg-secondary-400 border-secondary-200'
              />
              <TextField
                form={form}
                name='lastName'
                placeholder='Last Name'
                outlined
                rounded
                className='!bg-secondary-400 border-secondary-200'
              />
              <TextField
                form={form}
                name='mobile'
                placeholder='Phone Number'
                outlined
                rounded
                className='!bg-secondary-400 border-secondary-200'
              />
              <TextField
                form={form}
                name='email'
                placeholder='Email'
                outlined
                rounded
                className='!bg-secondary-400 border-secondary-200'
              />
              <div className='grid grid-cols-2 gap-3'>
                <PasswordField
                  form={form}
                  name='password'
                  placeholder='Password'
                  outlined
                  rounded
                  className='!bg-secondary-400 border-secondary-200'
                />
                <PasswordField
                  form={form}
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  outlined
                  rounded
                  className='!bg-secondary-400 border-secondary-200'
                />
              </div>
            </div>
            <div className='mt-4 mb-10 text-center'>
              <Button
                className='w-full mt-8 !bg-success-400 hover:!bg-success-200'
                type='submit'
                rounded
              >
                Sign Up
              </Button>
            </div>
          </form>
          {isSubmitting && (
            <div className='absolute top-[18px]'>
              <Loading white />
            </div>
          )}
          <div className='w-full'>
            <div className='relative flex flex-col items-center justify-center'>
              <span className='h-[1px] border border-[rgba(53,69,133,0.4)] w-full
                absolute top-1/2 -translate-y-1/2'
              >
              </span>
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
              <p>Do you already have an account?</p>
              <Link
                to={routesConfig.signIn}
                className='text-secondary-200 font-semibold underline-run'
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default SignUp
