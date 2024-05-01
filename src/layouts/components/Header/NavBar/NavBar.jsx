import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { NAV_BAR } from '~/utils/constants'
import styles from './NavBar.module.css'

function NavBar({ open }) {
  return (
    <nav
      className={clsx(
        {
          [styles.expanded]: open,
          hidden: !open
        },
        styles.shadow,
        'lg:block animate-slideDown lg:animate-none bg-white text-black'
      )}
    >
      <ul className='container flex flex-col lg:flex-row lg:py-2 font-medium'>
        {NAV_BAR.map((item) => (
          <li
            key={item.ID}
            className='capitalize mr-[24px] py-1 text-sm transition-all duration-300 ease-in-out relative after:cursor-pointer after:absolute after:bottom-0 after:left-0 after:bg-primary-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300'
          >
            <NavLink
              key={item.ID}
              to={item.PATH}
              className={({ isActive }) => {
                const baseStyle = ''
                return isActive
                  ? `${baseStyle} text-primary-400`
                  : `${baseStyle} hover:text-primary-400`
              }}
            >
              {item.VALUE}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
