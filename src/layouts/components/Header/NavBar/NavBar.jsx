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
            className='capitalize mr-[24px] py-1 text-sm underline-run'
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
