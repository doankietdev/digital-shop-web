/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, PasswordField, TextField } from '~/components'
import {
  FaGooglePlusGIcon,
  FaFacebookFIcon,
  FaLinkedinInIcon,
  FaGithubIcon
} from '~/utils/icons'

function SignUpForm({ onSubmit }, ref) {
  const schema = yup.object({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup
      .string()
      .min(2, 'Last name must have at least 2 characters')
      .required('Please enter your last name'),
    mobile: yup
      .string()
      .length(10, 'Phone number must have 10 characters')
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

  useImperativeHandle(ref, () => ({
    reset: () => {
      form.reset()
    }
  }))

  const handleSubmit = (data) => {
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(data)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className='px-10 h-full flex justify-center items-center flex-col'
    >
      <h1 className='text-[32px] font-semibold capitalize'>Sign Up</h1>
      <div className='flex gap-3 my-5'>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaGooglePlusGIcon />
        </a>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaFacebookFIcon />
        </a>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaGithubIcon />
        </a>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaLinkedinInIcon />
        </a>
      </div>
      <span className='text-[12px] font-light'>
        or use your email for sign up
      </span>
      <div className='flex flex-col gap-3 w-full text-[13px] mt-[10px] mb-[25px]'>
        <TextField
          form={form}
          name='firstName'
          placeholder='First Name'
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
      <Button type='submit' rounded>
        Sign Up
      </Button>
    </form>
  )
}

export default forwardRef(SignUpForm)
