import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button, PasswordFieldOutlined } from '~/components'
import { dispatch } from '~/redux'
import userService from '~/services/userService'
import { signOut } from '../Auth/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { routesConfig } from '~/config'

function ChangePassword() {
  const schema = yup.object({
    currentPassword: yup.string().required('Please enter current password'),
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
      .oneOf([yup.ref('newPassword')], 'New Password confirmation does not match')
      .required('Please re-enter your password')
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    },
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()

  const onSubmit = useCallback(async({ currentPassword, newPassword }) => {
    const loadingToast = toast.loading('Changing password...')
    try {
      await userService.changePassword({ currentPassword, newPassword })
      await dispatch(signOut()).unwrap()
      navigate(routesConfig.signIn)
      toast.success('Change password successfully. Please sign in again!')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      toast.dismiss(loadingToast)
    }
  }, [navigate])

  return (
    <div>
      <h2 className='font-medium text-[18px] text-center'>Change Password</h2>
      <div className="mt-7 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-[350px]'>
          <PasswordFieldOutlined
            label='Current Password'
            {...register('currentPassword')}
            errorMessage={errors.currentPassword?.message}
          />
          <PasswordFieldOutlined
            label='New Password'
            {...register('newPassword')}
            errorMessage={errors.newPassword?.message}
          />
          <PasswordFieldOutlined
            label='New Password Confirmation'
            {...register('newPasswordConfirmation')}
            errorMessage={errors.newPasswordConfirmation?.message}
          />
          <Button type='submit' primary rounded disabled={isSubmitting || !isDirty}>Change</Button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
