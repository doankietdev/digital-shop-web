import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from '~/components'

function Dropdown({ label, title, children }) {
  const [open, setOpen] = useState(false)

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen)
  }, [])

  return (
    <div className='min-w-[32px] relative'>
      <button
        className='flex items-center text-sm pe-1 font-medium text-gray-900 hover:text-mai md:me-0  px-2'
        onClick={handleToggle}
      >
        {label}
      </button>
      {open && (
        <div className='z-10 bg-white rounded-lg shadow-2xl absolute right-0 bottom-[-10px] translate-y-full min-w-[180px] overflow-hidden'>
          {!!title && (
            <>
              <div className='px-5 py-3 text-sm text-gray-900  w-max'>
                {title}
              </div>
              <DropdownDivider />
            </>
          )}
          <ul className='text-sm text-gray-700'>
            {children}
          </ul>
        </div>
      )}
    </div>
  )
}

function DropdownItem({ link, children, onClick }) {
  return (
    <li
      className={
        link
          ? ''
          : 'w-full px-5 py-3 hover:bg-gray-100 -gray-600 -white cursor-pointer'
      }
      onClick={onClick}
    >
      {!!link ? (
        <Link
          className='w-full block px-5 py-3 hover:bg-gray-100 -gray-600 -white'
          to={link}
        >
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </li>
  )
}

function DropdownDivider() {
  return (
    <div className='px-5'>
      <Divider />
    </div>
  )
}

export { DropdownItem, DropdownDivider }

export default Dropdown
