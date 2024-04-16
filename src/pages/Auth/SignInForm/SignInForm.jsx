/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useCallback, useImperativeHandle, useState, memo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import clsx from 'clsx'
import { Button, Loading, PasswordField, TextField } from '~/components'
import { FaGooglePlusGIcon, FaFacebookFIcon } from '~/utils/icons'

function SignInForm({ onSubmit }, ref) {
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
      <h1 className='text-[32px] font-semibold capitalize'>Sign In</h1>
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
      <div className='w-full relative'>
        <Button
          className='absolute top-0 left-1/2 translate-x-[-50%]'
          type='submit'
          rounded
        >
          Sign In
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

export default memo(forwardRef(SignInForm))
