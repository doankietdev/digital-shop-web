import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
import forgotPasswordImage from '~/assets/forgot-password.svg'
import { Button, Card, Loading, TextField } from '~/components'
import { routesConfig } from '~/config'
import authService from '~/services/authService'
import { GrSendIcon } from '~/utils/icons'

function ForgotPassword() {
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const schema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter your email')
  })

  const form = useForm({
    mode: 'onBlur',
    disabled,
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(schema)
  })

  const {
    formState: { isSubmitting }
  } = form

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setDisabled(true)
        await authService.forgotPassword(data)
        navigate(routesConfig.verifyPasswordResetOTP)
      } catch (error) {
        toast.error(error.messages[0])
      } finally {
        setDisabled(false)
      }
    },
    [navigate]
  )

  return (
    <div
      className={clsx('flex justify-center items-center h-screen bg-secondary-400')}
    >
      <Card className='fade-in !min-w-0 w-[520px] shadow-none'>
        <form
          className='flex flex-col justify-center items-center p-[44px] relative'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h2 className='text-[23px] tracking-[2px] font-semibold'>
            Forgot Password?
          </h2>
          <img
            src={forgotPasswordImage}
            className='w-[160px] h-[160px] object-contain'
          />
          <p className='text-[14px] text-center opacity-60 font-medium'>
            Enter your email and we&apos;ll send you a OTP code to reset your
            password.
          </p>
          <TextField
            className='mt-4 text-[14px]'
            form={form}
            name='email'
            placeholder='Email'
            outlined
            rounded
          />
          <div className='mt-5 w-full relative flex justify-center items-center'>
            <Button
              className='!bg-secondary-400 hover:!bg-secondary-200 w-full py-[15px]'
              type='submit'
              rounded
              startIcon={<GrSendIcon className='text-[18px]' />}
            >
              Send
            </Button>
          </div>

          <div className='mt-6 text-[14px] font-semibold'>
            <span className='mr-1'>Remember password?</span>
            <Link className='p-1 text-secondary-400 hover:text-secondary-200' to={routesConfig.auth}>
              Sign in
            </Link>
          </div>
          {isSubmitting && <Loading className='absolute bottom-[-12px]' />}
        </form>
      </Card>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default ForgotPassword
