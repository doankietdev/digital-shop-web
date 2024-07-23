import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '~/assets/logo.png'
import noAvatarImage from '~/assets/no-avatar-image.png'
import {
  AvatarDropdown,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  Search
} from '~/components'
import { routesConfig } from '~/config'
import { signOut } from '~/pages/Auth/AuthSlice'
import { clear as clearCart } from '~/pages/Cart/CartSlice'
import { dispatch } from '~/redux'
import { cartSelector, userSelector } from '~/redux/selectors'
import { StorageKeys } from '~/utils/constants'
import { formatCash, parsePlaceHolderUrl } from '~/utils/formatter'
import {
  FaCartShoppingIcon,
  FaUserIcon,
  IoMenuIcon
} from '~/utils/icons'
import styles from './Header.module.css'
import NavBar from './NavBar'

function Header() {
  const [openExpandedNavBar, setOpenExpandedNavBar] = useState(false)
  const { current: user } = useSelector(userSelector)
  const cart = useSelector(cartSelector)

  const mainHeaderRef = useRef(null)

  const navigate = useNavigate()

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
      dispatch(clearCart())
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
      localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
      navigate(routesConfig.home, { replace: true })
      toast.success('Sign out successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  const handleOpenExpandedNavBar = useCallback(() => {
    setOpenExpandedNavBar((prev) => !prev)
  }, [])

  return (
    <>
      <header>
        <div
          className='bg-primary-400 text-white relative z-50'
          ref={mainHeaderRef}
        >
          <div className='container py-2 md:py-3 lg:py-4 flex items-center
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
                <Search />
              </div>
              <div className='flex items-center gap-2 md:gap-4 lg:gap-7'>
                <Dropdown
                  label={(
                    <Link to={routesConfig.cart} className='py-2 flex'>
                      <FaCartShoppingIcon className='icon text-white !text-[24px]' />
                      <span className='hidden md:flex relative -top-[10px] -left-[10px]
                      min-w-[26px] h-[22px] rounded-full justify-center items-center px-[6px]
                      bg-white text-primary-400 border-2 border-primary-400 text-[10px]'
                      >
                        {cart.products.length >= 99 ? '99+' : cart.products.length}
                      </span>
                    </Link>
                  )}
                  footer={(
                    <>
                      <Divider />
                      <div className='flex items-center justify-between p-3'>
                        <div className='text-black/60 text-[12px]'>
                          {cart.products.length - 5 && `There are ${cart.products.length - 5} more products added`}
                        </div>
                        <Link to={routesConfig.cart}>
                          <Button
                            primary
                            rounded
                            className='!text-[14px] !px-[12px] !py-[8px] min-w-[120px]'
                          >
                          View Cart
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                  title='New Products Added'
                  titleClassName='font-medium text-black/45'
                  dropdownContainerClassName='w-[600px] origin-[calc(100%-36px)_-10px]'
                  arrowClassName='right-[28px]'
                  bridgeClassName='!w-[64px]'
                  hover
                >
                  {cart.products.slice(0, 5).map(({ product, variantId }, index) => {
                    const variant = product.variants?.find(variant => variant._id === variantId)
                    if (!variant) {
                      // navigate error page
                      return
                    }

                    return (
                      <DropdownItem
                        key={index}
                        link={parsePlaceHolderUrl(routesConfig.productDetails, {
                          slug: product.slug
                        })}
                        className="flex items-center gap-1 !px-3 !py-2"
                      >
                        <img
                          src={variant.images[0]}
                          className="w-[50px] h-[50px] object-cover"
                        />
                        <div className="flex-1 flex flex-col md:flex-row gap-[6px] md:gap-0">
                          <div className="flex-1 flex flex-col gap-[6px]">
                            <p className="line-clamp-1 font-medium text-[14px]">{product.title}</p>
                            <p className="text-gray-500 text-[12px]">
                              Variant: {variant.name}
                            </p>
                          </div>
                          <div>
                            {formatCash(product.price)}
                          </div>
                        </div>
                      </DropdownItem>
                    )
                  })}
                </Dropdown>
                {user._id ? (
                  <div className='hidden md:block'>
                    <AvatarDropdown
                      avatarSrc={user.image?.url || noAvatarImage}
                      fullName={`${user.firstName} ${user.lastName}`}
                      email={user.email}
                      hover
                    >
                      <DropdownItem link={routesConfig.profile}>
                        My Account
                      </DropdownItem>
                      <DropdownItem link={routesConfig.orders}>
                        My Orders
                      </DropdownItem>
                      <Divider />
                      <DropdownItem onClick={handleSignOut}>
                        Sign Out
                      </DropdownItem>
                    </AvatarDropdown>
                  </div>
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
