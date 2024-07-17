import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import forgotPasswordImage from '~/assets/forgot-password.svg'
import { Button, Card, DocumentTitle, TextFieldOutlined } from '~/components'
import { routesConfig } from '~/config'
import authService from '~/services/authService'
import { GrSendIcon } from '~/utils/icons'

function ForgotPassword() {
  const navigate = useNavigate()

  const schema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter your email')
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
      email: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(
    async (data) => {
      const loadingToast = toast.loading('Finding account...')
      try {
        const { email, expiresAt } = await authService.forgotPassword(data)
        navigate(`${routesConfig.verifyPasswordResetOTP}?email=${email}&expiresAt=${expiresAt}`, { replace: true })
      } catch (error) {
        toast.error(error.message)
      } finally {
        toast.dismiss(loadingToast)
      }
    },
    [navigate]
  )

  useLayoutEffect(() => { setFocus('email') }, [setFocus])

  return (
    <>
      <DocumentTitle title='Forgot Password' />
      <Card
        className='animate-growthCenter max-w-[520px] w-full'
      >
        <form
          className='flex flex-col justify-center items-center relative p-4 md:p-10 lg:p-15'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='text-center text-[20px] md:text-[24px] tracking-[2px] font-semibold'>
            Forgot Password?
          </h2>
          <img
            src={forgotPasswordImage}
            className='w-[140px] h-[140px] md:w-[160px] md:h-[160px] object-contain'
          />
          <p className='mb-[20px] text-[14px] text-center opacity-60 font-medium'>
            Enter your email to find your account
          </p>
          <div className='mb-[20px] w-full'>
            <TextFieldOutlined
              label='Email'
              outlined
              rounded
              {...register('email')}
              onInput={() => clearErrors('email')}
              errorMessage={errors.email?.message}
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

export default ForgotPassword
