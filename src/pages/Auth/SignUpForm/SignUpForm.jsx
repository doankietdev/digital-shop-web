/* eslint-disable react-refresh/only-export-components */
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button, Loading, PasswordField, TextField } from '~/components'
import { FaFacebookFIcon, FaGooglePlusGIcon } from '~/utils/icons'

const fieldNameLabels = {
  firstName: 'first name',
  lastName: 'last name',
  mobile: 'phone number',
  email: 'email',
  password: 'password'
}

function SignUpForm({ onSubmit, errors }, ref) {
  const [disable, setDisable] = useState(false)

  const schema = yup.object({
    firstName: yup
      .string()
      .min(1, 'First name must have at least 1 characters')
      .required('Please enter your first name'),
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
        'Password must contain at least 1 special character from the following list: `@`, `$`, `!`, `%`, `*`, `?`, `&`, `_`, `. `'
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

  useImperativeHandle(ref, () => ({
    reset: () => {
      form.reset()
    }
  }))

  const handleSubmit = useCallback(
    async (data) => {
      if (onSubmit && typeof onSubmit === 'function') {
        setDisable(true)
        await onSubmit(data)
        setDisable(false)
      }
    },
    [onSubmit]
  )

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className='px-10 h-full flex justify-center items-center flex-col'
    >
      <h1 className='text-[32px] font-semibold capitalize tracking-[2px]'>Sign Up</h1>
      <div className='flex gap-3 my-5'>
        <a
          href='#'
          title='Google'
          className={clsx(
            {
              disabled: isSubmitting
            },
            'w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
          )}
        >
          <FaGooglePlusGIcon />
        </a>
        <a
          href='#'
          title='Facebook'
          className={clsx(
            {
              disabled: isSubmitting
            },
            'w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
          )}
        >
          <FaFacebookFIcon />
        </a>
      </div>
      <span className='text-[12px] font-light tracking-[1px]'>
        or use your email for sign up
      </span>
      <div className='flex flex-col gap-3 w-full text-[13px] mt-[10px] mb-[25px]'>
        <TextField
          form={form}
          name='firstName'
          placeholder={fieldNameLabels.firstName}
          outlined
          rounded
        />
        <TextField
          form={form}
          name='lastName'
          placeholder='Last Name'
          outlined
          rounded
        />
        <TextField
          form={form}
          name='mobile'
          placeholder='Phone Number'
          outlined
          rounded
        />
        <TextField
          form={form}
          name='email'
          placeholder='Email'
          outlined
          rounded
        />
        <div className='grid grid-cols-2 gap-3'>
          <PasswordField
            form={form}
            name='password'
            placeholder='Password'
            outlined
            rounded
          />
          <PasswordField
            form={form}
            name='confirmPassword'
            placeholder='Confirm Password'
            outlined
            rounded
          />
        </div>
      </div>
      <div className='w-full relative'>
        <Button
          className='absolute top-0 left-1/2 translate-x-[-50%]'
          type='submit'
          rounded
        >
          Sign Up
        </Button>
        {isSubmitting && (
          <div className='absolute top-0 left-1/2 translate-x-[90px]'>
            <Loading white />
          </div>
        )}
      </div>
    </form>
  )
}

export default forwardRef(SignUpForm)
