import { useSelector } from 'react-redux'
import { Button, TextFieldOutlined } from '~/components'
import { userSelector } from '~/redux/selectors'
import { UploadIcon } from '~/utils/icons'
import noAvatarImage from '~/assets/no-avatar-image.png'

function Profile() {
  const { current: user } = useSelector(userSelector)

  return (
    <div>
      <h2 className='font-medium text-[18px] text-center'>My Profile</h2>
      <div className="mt-7 flex">
        <div className="basis-2/3">
          <form className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              <TextFieldOutlined label='First Name' defaultValue={user.firstName} />
              <TextFieldOutlined label='Last Name' defaultValue={user.lastName} />
            </div>
            <TextFieldOutlined label='Email' defaultValue={user.email} disabled />
            <TextFieldOutlined label='Phone Number' defaultValue={user.mobile} disabled />
            <Button primary rounded>Update</Button>
          </form>
        </div>
        <div className="basis-1/3 flex flex-col justify-center items-center gap-6">
          <img
            className='w-[100px] h-[100px] rounded-full object-cover'
            src={user.image || noAvatarImage}
          />
          <Button
            primary
            rounded
            icon={<UploadIcon className='icon !text-[24px]' />}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
