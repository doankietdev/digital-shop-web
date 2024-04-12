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

function SignInForm({ onSubmit }, ref) {
  const schema = yup.object({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password')
  })

  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
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
      <h1 className='text-[32px] font-semibold capitalize'>Sign In</h1>
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
      <span className='text-[12px] font-light'>or use your email password</span>
      <div className='flex flex-col gap-3 w-full text-[13px] mt-[10px]'>
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
      </div>
      <a href='#' className='mt-[24px] text-[13px] font-light mb-[25px]'>
        Forget Your Password?
      </a>
      <Button type='submit' rounded>
        Sign In
      </Button>
    </form>
  )
}

export default forwardRef(SignInForm)
