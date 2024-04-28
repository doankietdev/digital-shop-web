import { NavLink } from 'react-router-dom'
import { NAV_BAR } from '~/utils/constants'
import styles from './NavBar.module.css'
import clsx from 'clsx'

function NavBar({ open }) {
  return (
    <nav
      className={clsx(
        {
          [styles.expanded]: open,
          hidden: !open
        },
        'lg:block animate-slideDown bg-white text-black'
      )}
    >
      <ul className='container flex flex-col lg:flex-row border-t lg:border-b lg:py-2 font-medium'>
        {NAV_BAR.map((item) => (
          <li
            key={item.ID}
            className='p-2 lg:py-0'
          >
            <NavLink
              key={item.ID}
              to={item.PATH}
              className={({ isActive }) => {
                const baseStyle = 'uppercase pr-[30px] text-sm'
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
