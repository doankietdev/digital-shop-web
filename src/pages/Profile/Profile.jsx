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
    const loadingToast = toast.loading('Uploading...')
    try {
      setDisabled(true)
      const formData = new FormData()
      formData.append('image', files[0])
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
      .min(1, 'First name must have at least 1 characters')
      .required('Please enter your first name'),
    lastName: yup
      .string()
      .min(2, 'Last name must have at least 2 characters')
      .required('Please enter your last name')
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isDirty, isSubmitting }
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
  }, [user.firstName, user.lastName, reset])

  const onSubmit = useCallback(async (data) => {
    if (!isDirty) {
      return
    }
    const loadingToast = toast.loading('Updating...')
    try {
      setDisabled(true)
      const touchedData = Object.keys(data).reduce((acc, key) => {
        if (touchedFields[key]) {
          acc[key] = data[key]
        }
        return acc
      }, {})
      await dispatch(updateCurrentUser(touchedData)).unwrap()
      toast.success('Update profile successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [isDirty, touchedFields])

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
                src={user.image.url || noAvatarImage}
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
                  />
                  <TextFieldOutlined
                    label='Last Name'
                    {...register('lastName')}
                    defaultValue={user.lastName}
                    errorMessage={errors.lastName?.message}
                  />
                </div>
                <TextFieldOutlined label='Email' defaultValue={user.email} disabled />
                <TextFieldOutlined label='Phone Number' defaultValue={user.mobile} disabled />
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
