import { NavLink } from 'react-router-dom'
import { NAV_BAR } from '~/utils/constants'

function NavBar() {
  return (
    <nav>
      <div className='container border-t border-b py-2'>
        {NAV_BAR.map((item) => (
          <NavLink
            key={item.ID}
            to={item.PATH}
            className={({ isActive }) => {
              const baseStyle = 'uppercase pr-[30px] py-1 text-sm'
              return isActive
                ? `${baseStyle} text-main`
                : `${baseStyle} hover:text-main`
            }}
          >
            {item.VALUE}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
