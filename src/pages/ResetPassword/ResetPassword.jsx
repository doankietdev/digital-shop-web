import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import resetPasswordIcon from '~/assets/reset-password-icon.png'
import {
  Button,
  Card,
  DocumentTitle,
  PasswordFieldOutlined
} from '~/components'
import { routesConfig } from '~/config'
import authService from '~/services/authService'
import { GrSendIcon } from '~/utils/icons'

function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    !location.state?.email && navigate(routesConfig.signIn, { replace: true })
  }, [location.state?.email, navigate])

  const schema = yup.object({
    newPassword: yup
      .string()
      .min(6, 'Password must have at least 6 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
      .matches(/\d/, 'Password must contain at least 1 digit')
      .matches(
        /[@$!%*?&_.]/,
        `Password must contain at least 1 special character from the following list:
          \`@\`, \`$\`, \`!\`, \`%\`, \`*\`, \`?\`, \`&\`, \`_\`, \`.\``
      )
      .required('Please enter your password'),
    newPasswordConfirmation: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Password does not match')
      .required('Please re-enter your password')
  })

  const {
    register,
    handleSubmit,
    setFocus,
    clearErrors,
    formState: { isSubmitting, isDirty, errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(
    async (data) => {
      const loadingToast = toast.loading('Resetting password')
      try {
        await authService.resetPassword({ email: location.state?.email, newPassword: data.newPassword })
        toast.success('Reset password successfully. Please sign in to buy our products!')
        navigate(routesConfig.signIn, { replace: true })
      } catch (error) {
        toast.error(error.message)
      } finally {
        toast.dismiss(loadingToast)
      }
    },
    [location.state?.email, navigate]
  )

  useLayoutEffect(() => setFocus('newPassword'), [setFocus])

  return (
    <>
      <DocumentTitle title='Reset Password' />
      <Card className='animate-growthCenter max-w-[520px] w-full'>
        <form
          className='flex flex-col justify-center items-center relative p-4 md:p-10 lg:p-15'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='text-[20px] md:text-[23px] tracking-[2px] font-semibold'>
              Reset Password
          </h2>
          <img
            src={resetPasswordIcon}
            className='my-6 w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain'
          />
          <p className='mb-[20px] text-[14px] text-center'>
              Enter your new password to reset your password.
          </p>
          <div className='mb-[20px] w-full'>
            <PasswordFieldOutlined
              label='New Password'
              outlined
              rounded
              {...register('newPassword')}
              onInput={() => clearErrors('newPassword')}
              errorMessage={errors.newPassword?.message}
              disabled={isSubmitting}
            />
          </div>
          <div className='mb-[20px] w-full'>
            <PasswordFieldOutlined
              label='New Password Confirmation'
              outlined
              rounded
              {...register('newPasswordConfirmation')}
              onInput={() => clearErrors('newPasswordConfirmation')}
              errorMessage={errors.newPasswordConfirmation?.message}
              disabled={isSubmitting}
            />
          </div>
          <Button
            type='submit'
            primary
            rounded
            startIcon={<GrSendIcon className='text-[18px]' />}
            disabled={!isDirty || isSubmitting}
            className='w-full'
          >
            Send
          </Button>

          <div className='mt-[20px] text-[14px] font-semibold text-center'>
            <span className='mr-1'>Remember password?</span>
            <Link
              className='p-1 text-primary-400 hover:text-primary-200 underline-run hover:after:bg-primary-200'
              to={routesConfig.signIn}
            >
                Sign in
            </Link>
          </div>
        </form>
      </Card>
    </>
  )
}

export default ResetPassword
