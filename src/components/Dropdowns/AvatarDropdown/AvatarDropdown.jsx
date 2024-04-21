import { Dropdown } from '~/components'

function AvatarDropDown({ className, children, fullName, email, avatarSrc }) {
  if (!avatarSrc) throw new Error('`avatarSrc` is missing')
  return (
    <Dropdown
      className={className}
      label={
        <>
          <img
            className='w-[36x] h-[36px] object-cover rounded-full'
            src={avatarSrc}
          />
        </>
      }
      title={
        !!fullName &&
        !!email && (
          <div className='flex items-center gap-3'>
            <img
              className='w-[60px] h-[60px] object-cover rounded-full'
              src={avatarSrc}
            />
            <div>
              <p className='font-semibold'>{fullName}</p>
              <p className='text-[14px] text-[#757575]'>{email}</p>
            </div>
          </div>
        )
      }
    >
      {children}
    </Dropdown>
  )
}

export default AvatarDropDown
