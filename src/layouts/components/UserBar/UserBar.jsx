import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { routesConfig } from '~/config'
import { userSelector } from '~/redux/selectors'
import { EditIcon, FaUserIcon, NotificationsIcon, PaperIcon } from '~/utils/icons'
import noAvatarImage from '~/assets/no-avatar-image.png'

function AccountBar() {
  const { current: user } = useSelector(userSelector)

  return (
    <div className='text-[14px]'>
      <div className='flex gap-[15px] items-center'>
        <img
          className='w-[48px] h-[48px] rounded-full object-cover'
          src={user?.image?.url || noAvatarImage}
        />
        <div>
          <p className='font-semibold'>{`${user.firstName} ${user.lastName}`}</p>
          <Link to={routesConfig.profile} className='font-medium text-black/60 flex items-center gap-1'>
            <EditIcon className='icon' />
            Edit Profile
          </Link>
        </div>
      </div>
      <div className='mt-[30px]'>
        <div>
          <Link to={routesConfig.profile} className='block group'>
            <FaUserIcon className='w-[20px] icon mr-[10px] text-red-600' />
            <span className='group-hover:text-primary-400 transition-all ease-in-out duration-300'>My Account</span>
          </Link>
          <ul className='ml-[30px] mt-[4px] flex flex-col gap-[4px]'>
            <li>
              <NavLink
                to={routesConfig.profile}
                className={({ isActive }) => isActive ? 'text-primary-400 block'
                  : 'block text-black/80 hover:text-primary-400 transition-all ease-in-out duration-300'}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routesConfig.changePassword}
                className={({ isActive }) => isActive ? 'block text-primary-400'
                  : 'block text-black/80 hover:text-primary-400 transition-all ease-in-out duration-300'}
              >
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routesConfig.addresses}
                className={({ isActive }) => isActive ? 'text-primary-400 block'
                  : 'block text-black/80 hover:text-primary-400 transition-all ease-in-out duration-300'}
              >
                Addresses
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='mt-[8px]'>
          <NavLink to={routesConfig.orders} className='block group'>
            {({ isActive }) => (
              <>
                <PaperIcon className='w-[20px] icon mr-[10px] text-green-600' />
                <span
                  className={clsx(
                    'group-hover:text-primary-400 transition-all ease-in-out duration-300',
                    {
                      'text-primary-400': isActive
                    }
                  )}
                >
                  My Orders
                </span>
              </>
            )}
          </NavLink>
        </div>
        <div className='mt-[8px]'>
          <NavLink to={routesConfig.notifications} className='block group'>
            {({ isActive }) => (
              <>
                <NotificationsIcon className='w-[24px] !text-[24px] icon mr-[6px] text-orange-600' />
                <span
                  className={clsx(
                    'group-hover:text-primary-400 transition-all ease-in-out duration-300',
                    {
                      'text-primary-400': isActive
                    }
                  )}
                >
                  Notifications
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default AccountBar
