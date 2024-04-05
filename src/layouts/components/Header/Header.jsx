import { Link } from 'react-router-dom'
import { routesConfig } from '~/config'
import logo from '~/assets/logo.png'
import {
  FaPhoneAltIcon,
  IoMdMailIcon,
  FaCartShoppingIcon,
  FaUserIcon
} from '~/utils/icons'

function Header() {
  return (
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
          <div className='flex items-center gap-2'>
            <FaUserIcon size='20px' className='text-main' />
            <span className='text-[14px]'>Login</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
