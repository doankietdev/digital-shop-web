import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
import resetPasswordIcon from '~/assets/reset-password-icon.png'
import { Button, Card, Loading, PasswordField } from '~/components'
import { routesConfig } from '~/config'
import authService from '~/services/authService'
import { StorageKeys } from '~/utils/constants'
import { GrSendIcon } from '~/utils/icons'

function ResetPassword() {
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const schema = yup.object({
    newPassword: yup
      .string()
      .min(6, 'Password must have at least 6 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
      .matches(/\d/, 'Password must contain at least 1 digit')
      .matches(
        /[@$!%*?&_.]/,
        'Password must contain at least 1 special character from the following list: `@`, `$`, `!`, `%`, `*`, `?`, `&`, `_`, `. `'
      )
      .required('Please enter your password'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Password does not match')
      .required('Please re-enter your password')
  })

  const form = useForm({
    mode: 'onBlur',
    disabled,
    defaultValues: {
      newPassword: '',
      confirmNewPassword: ''
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
        await authService.resetPassword({ newPassword: data.newPassword })
        sessionStorage.setItem(StorageKeys.IS_RESET_PASSWORD_SUCCESS, true)
        navigate(routesConfig.auth)
      } catch (error) {
        toast.error(error.messages[0])
      } finally {
        setDisabled(false)
        form.reset()
      }
    },
    [form, navigate]
  )

  return (
    <div
      className={clsx('flex justify-center items-center h-screen bg-[#885CEE]')}
    >
      <Card className='fade-in !min-w-0 w-[520px] shadow-none'>
        <form
          className='flex flex-col justify-center items-center p-[44px] relative'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h2 className='text-[23px] tracking-[2px] font-semibold'>
            Reset Password
          </h2>
          <img
            src={resetPasswordIcon}
            className='my-6 w-[100px] h-[100px] object-contain'
          />
          <p className='text-[14px] text-center opacity-60 font-medium'>
            Enter your new password to reset your password.
          </p>
          <PasswordField
            className='mt-4 text-[14px]'
            form={form}
            name='newPassword'
            placeholder='New Password'
            outlined
            rounded
          />
          <PasswordField
            className='mt-4 text-[14px]'
            form={form}
            name='confirmNewPassword'
            placeholder='Confirm New Password'
            outlined
            rounded
          />
          <div className='mt-5 w-full relative flex justify-center items-center'>
            <Button
              className='!bg-[#885CEE] hover:!bg-[#976ff3] w-full py-[15px]'
              type='submit'
              rounded
              startIcon={<GrSendIcon className='text-[18px]' />}
            >
              Reset Password
            </Button>
          </div>

          <div className='mt-6 text-[14px] font-semibold'>
            <span className='mr-1'>Remember password?</span>
            <Link className='p-1 text-[#885CEE]' to={routesConfig.auth}>
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

export default ResetPassword
