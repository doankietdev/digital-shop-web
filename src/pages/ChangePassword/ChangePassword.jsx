import { Button, PasswordFieldOutlined } from '~/components'

function ChangePassword() {

  return (
    <div>
      <h2 className='font-medium text-[18px] text-center'>Change Password</h2>
      <div className="mt-7 flex justify-center">
        <form className='flex flex-col gap-4 w-[350px]'>
          <PasswordFieldOutlined onChange={() => {}} label='Current Password' />
          <PasswordFieldOutlined label='New Password' />
          <PasswordFieldOutlined label='New Password Confirmation' />
          <Button primary rounded>Change</Button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
