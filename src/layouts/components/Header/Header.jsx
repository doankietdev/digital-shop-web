import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '~/assets/logo.png'
import noAvatarImage from '~/assets/no-avatar-image.png'
import {
  AvatarDropdown,
  DropdownDivider,
  DropdownItem
} from '~/components'
import { routesConfig } from '~/config'
import { signOut } from '~/pages/Auth/AuthSlice'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import {
  FaCartShoppingIcon,
  FaPhoneAltIcon,
  FaUserIcon,
  IoMdMailIcon
} from '~/utils/icons'

function Header() {
  const { current: user } = useSelector(userSelector)

  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap()
    } catch (error) {
      toast.error(error.messages[0])
    }
  }

  return (
    <>
      <header className='py-[35px]'>
        <div className='container flex justify-between text-[13px]'>
          <Link to={routesConfig.home}>
            <img src={logo} alt='logo' className='w-[234px] object-contain' />
          </Link>
          <div className='flex gap-10'>
            <div className='flex flex-col justify-center items-center'>
              <span className='flex items-center gap-3'>
                <FaPhoneAltIcon size='13px' className='text-main' />
                <span className='font-semibold'>(+1800) 000 8808</span>
              </span>
              <span className='text-[12px]'>Mon-Sat 9:00AM - 8:00PM</span>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <span className='flex items-center gap-3'>
                <IoMdMailIcon size='13px' className='text-main' />
                <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
              </span>
              <span className='text-[12px]'>Online Support 24/7</span>
            </div>
            <div className='flex items-center gap-2'>
              <FaCartShoppingIcon size='20px' className='text-main' />
              <span className='text-[14px]'>0 item</span>
            </div>
            {user._id ? (
              <AvatarDropdown avatarSrc={user.image?.url || noAvatarImage} fullName={`${user.firstName} ${user.lastName}`} email={user.email} >
                <DropdownItem link={routesConfig.auth()}>My Account</DropdownItem>
                <DropdownItem link={routesConfig.auth()}>My Orders</DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
              </AvatarDropdown>
            ) : (
              <Link
                to={routesConfig.auth()}
                className='flex items-center gap-2 p-2'
              >
                <FaUserIcon size='20px' className='text-main' />
                <span className='text-[14px]'>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
