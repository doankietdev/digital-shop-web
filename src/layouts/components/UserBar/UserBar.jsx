import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { routesConfig } from '~/config'
import { FaUserIcon, LocationDotIcon, PaperIcon, SecurityIcon } from '~/utils/icons'

const NAV_LINKS = [
  {
    to: routesConfig.profile,
    title: 'Profile',
    icon: <FaUserIcon className='w-[20px] icon mr-[10px]' />
  },
  {
    to: routesConfig.security,
    title: 'Security',
    icon: <SecurityIcon className='w-[20px] icon mr-[10px]' />
  },
  {
    to: routesConfig.addresses,
    title: 'Addresses',
    icon: <LocationDotIcon className='w-[20px] icon mr-[10px]' />
  },
  {
    to: routesConfig.orders,
    title: 'Orders',
    icon: <PaperIcon className='w-[20px] icon mr-[10px]' />
  }
]

function AccountBar() {
  return (
    <div className='flex md:gap-4 overflow-x-auto no-scrollbar'>
      {NAV_LINKS.map((NAV_LINK, index) => (
        <NavLink
          key={index}
          to={NAV_LINK.to}
          className={({ isActive }) => clsx(
            'flex items-center p-[12px] underline-run hover:text-primary-400',
            {
              'text-primary-400 after:cursor-pointer after:absolute after:bottom-0 after:left-0 after:bg-primary-400 after:h-0.5 after:w-full': isActive
            }
          )}
        >
          {NAV_LINK.icon}
          <span>{NAV_LINK.title}</span>
        </NavLink>))}
    </div>
  )
}

export default AccountBar
