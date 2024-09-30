import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import noAvatarImage from '~/assets/no-avatar-image.png'
import { Button, DocumentTitle, FileField, TextFieldOutlined } from '~/components'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import { UploadIcon } from '~/utils/icons'
import { updateCurrentUser, uploadAvatar } from '../Auth/AuthSlice'

function Profile() {
  const { current: user } = useSelector(userSelector)

  const [disabled, setDisabled] = useState(false)

  const handleFileChange = useCallback(async (files) => {
    const file = files[0]
    const MAX_SIZE = process.env.REACT_APP_MAX_AVATAR_SIZE
    if (file?.size > MAX_SIZE) {
      toast.info(`Maximum file size is: ${Math.round(MAX_SIZE / 1024 / 1024)} MB`)
      return
    }

    const loadingToast = toast.loading('Uploading...')
    try {
      setDisabled(true)
      const formData = new FormData()
      formData.append('image', file)
      await dispatch(uploadAvatar(formData)).unwrap()
      toast.success('Upload avatar successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [])


  const schema = yup.object({
    firstName: yup
      .string()
      .required('Please enter your first name')
      .min(1, 'First name must have at least 1 characters'),
    lastName: yup
      .string()
      .required('Please enter your last name')
      .min(2, 'Last name must have at least 2 characters'),
    mobile: yup
      .string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
  })
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isDirty, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    disabled,
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName
    },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName
    })
  }, [user.firstName, user.lastName, reset, user.mobile])

  const onSubmit = useCallback(async (data) => {
    const loadingToast = toast.loading('Updating...')
    try {
      setDisabled(true)
      await dispatch(updateCurrentUser(data)).unwrap()
      toast.success('Update profile successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [])

  return (
    <>
      <DocumentTitle title='Profile' />
      <div className='flex justify-center'>
        <div className='max-w-[400px] w-full'>
          <h2 className='font-medium text-[18px] text-center'>Profile</h2>
          <div className="mt-7">
            <div className="flex justify-center items-center gap-6">
              <img
                className='w-[140px] h-[140px] rounded-full object-cover'
                src={user.image?.url || noAvatarImage}
              />
              <FileField
                primary
                rounded
                icon={<UploadIcon className='icon !text-[24px]' />}
                accept='.jpeg,.jpg,.png'
                disabled={disabled}
                onFileChange={handleFileChange}
              >
                Upload
              </FileField>
            </div>

            <div className="mt-7">
              <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-5'>
                  <TextFieldOutlined
                    label='First Name'
                    {...register('firstName')}
                    defaultValue={user.firstName}
                    errorMessage={errors.firstName?.message}
                    disabled={isSubmitting}
                    onInput={() => clearErrors('firstName')}
                  />
                  <TextFieldOutlined
                    label='Last Name'
                    {...register('lastName')}
                    defaultValue={user.lastName}
                    errorMessage={errors.lastName?.message}
                    disabled={isSubmitting}
                    onInput={() => clearErrors('lastName')}
                  />
                </div>
                <TextFieldOutlined label='Email' defaultValue={user.email} disabled />
                <Button type='submit' primary rounded disabled={disabled || isSubmitting || !isDirty}>Update</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
