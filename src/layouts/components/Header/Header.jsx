import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '~/assets/logo.png'
import noAvatarImage from '~/assets/no-avatar-image.png'
import {
  AvatarDropdown,
  Button,
  DropdownDivider,
  DropdownItem,
  Search
} from '~/components'
import { routesConfig } from '~/config'
import { signOut } from '~/pages/Auth/AuthSlice'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import {
  FaCartShoppingIcon,
  FaSearchIcon,
  FaUserIcon,
  IoMenuIcon
} from '~/utils/icons'
import NavBar from './NavBar'
import styles from './Header.module.css'

function Header() {
  const [openExpandedNavBar, setOpenExpandedNavBar] = useState(false)
  const { current: user } = useSelector(userSelector)
  const mainHeaderRef = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', function () {
      mainHeaderRef.current?.classList?.toggle(
        styles.active,
        window.scrollY > 71
      )
    })
  }, [])

  const handleSignOut = async () => {
    const loadingToast = toast.loading('Signing out...')
    try {
      await dispatch(signOut()).unwrap()
      toast.success('Sign out successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  const handleOpenExpandedNavBar = () => {
    setOpenExpandedNavBar((prev) => !prev)
  }

  return (
    <>
      <header>
        <div
          className='bg-primary-400 text-white relative z-50'
          ref={mainHeaderRef}
        >
          <div className='container py-2 md:py-3 lg:py-4 flex items-center gap-2
            md:gap-10 lg:gap-20 text-[13px] relative z-50'
          >
            <div className='flex items-center gap-1 -ml-2'>
              <div className='lg:hidden'>
                <span
                  onClick={handleOpenExpandedNavBar}
                  className='p-2'
                >
                  <IoMenuIcon className='icon !text-4xl' />
                </span>
              </div>
              <Link
                to={routesConfig.home}
                className=''
              >
                <img
                  src={logo}
                  alt='logo'
                  className='h-[15px] md:h-[20px] lg:h-[26px] object-contain'
                />
              </Link>
            </div>
            <div className='flex items-center gap-1 md:gap-7 flex-1'>
              <div className='flex-1'>
                <div className='hidden md:block'>
                  <Search />
                </div>
                <div className='flex justify-end md:hidden'>
                  <Button
                    icon={
                      <FaSearchIcon className='icon !text-base text-white' />
                    }
                    className='border-white min-w-[20px]'
                    outlined
                    rounded
                  />
                </div>
              </div>
              <div className='flex items-center gap-2 md:gap-4 lg:gap-7'>
                <div className='p-2 relative'>
                  <FaCartShoppingIcon className='icon' />
                  <span className='absolute bottom-[calc(100%-20px)] left-[calc(100%-20px)]
                    min-w-[26px] h-[22px] rounded-full flex justify-center items-center px-[6px]
                    bg-white text-primary-400 border-2 border-primary-400 text-[10px]'
                  >
                    99+
                  </span>
                </div>
                {user._id ? (
                  <AvatarDropdown
                    avatarSrc={user.image?.url || noAvatarImage}
                    fullName={`${user.firstName} ${user.lastName}`}
                    email={user.email}
                  >
                    <DropdownItem link={routesConfig.signIn}>
                      My Account
                    </DropdownItem>
                    <DropdownItem link={routesConfig.myOrders}>
                      My Orders
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownItem>
                  </AvatarDropdown>
                ) : (
                  <Link
                    to={routesConfig.signIn}
                    className='flex items-center gap-2'
                  >
                    <Button
                      icon={
                        <FaUserIcon className='!hidden md:!inline-block icon !text-base text-white' />
                      }
                      className='border-white min-w-[20px] text-white'
                      outlined
                      rounded
                    >
                      <span className='text-[12px] md:text-[14px]'>
                        Sign In
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <NavBar open={openExpandedNavBar} />
      </header>
    </>
  )
}

export default Header
