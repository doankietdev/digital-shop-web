import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from '~/components'
import styles from './Dropdown.module.css'
import { useOutsideClick } from '~/hooks'

function Dropdown({
  className,
  labelClassName = '',
  titleClassName = '',
  dropdownContainerClassName = '',
  itemContainerClassName = '',
  arrowClassName = '',
  bridgeClassName = '',
  footer,
  label,
  title,
  hover = false,
  children
}) {
  const [open, setOpen] = useState(false)

  const containerRef = useRef()

  useOutsideClick(containerRef, () => {
    if (!hover) {
      setOpen(false)
    }
  })

  const handleButtonClick = useCallback(() => {
    if (!hover) {
      setOpen((prevOpen) => !prevOpen)
    }
  }, [hover])

  const handleButtonMouseOver = useCallback(() => {
    if (hover) {
      setOpen(true)
    }
  }, [hover])


  const handleButtonMouseOut = useCallback(() => {
    if (hover) {
      setOpen(false)
    }
  }, [hover])

  const handleDropdownContainerMouseOver = useCallback(() => {
    if (hover) {
      setOpen(true)
    }
  }, [hover])

  const handleDropdownContainerMouseOut = useCallback(() => {
    if (hover) {
      setOpen(false)
    }
  }, [hover])


  return (
    <div
      className={clsx(
        className,
        'min-w-[32px] relative'
      )}
      ref={containerRef}
    >
      <button
        className={clsx(
          'flex items-center text-sm font-medium text-gray-900 px-2 py-1 select-none',
          labelClassName
        )}
        onClick={handleButtonClick}
        onMouseOver={handleButtonMouseOver}
        onMouseOut={handleButtonMouseOut}
      >
        {label}
      </button>
      {open && (
        <div
          className={clsx(
            'origin-[calc(100%-18px)_-10px] z-10 bg-white rounded shadow-2xl absolute right-0 top-[calc(100%+10px)] min-w-[200px]',
            styles.dropdownList,
            dropdownContainerClassName
          )}
          onMouseOver={handleDropdownContainerMouseOver}
          onMouseOut={handleDropdownContainerMouseOut}
        >
          {!!title && (
            <>
              <div className={clsx(
                'px-5 py-3 text-sm text-gray-900 w-max',
                titleClassName
              )}>
                {title}
              </div>
              <Divider />
            </>
          )}
          <div
            className={clsx('text-sm text-gray-700', itemContainerClassName)}
          >
            {children}
          </div>
          {footer}
          <div
            className={clsx(
              `border-x-[12px] border-t-0 border-b-[10px] border-white border-l-transparent
              border-r-transparent absolute bottom-full right-[10px]`,
              arrowClassName
            )}
          >
          </div>
          <div className={clsx(
            'absolute bottom-full right-0 w-[54px] bg-transparent h-[13px]',
            bridgeClassName
          )}>
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownItem({ link, children, className, onClick }) {
  return (
    <>
      {link ? (
        <Link
          className={clsx(
            'w-full block px-5 py-3 hover:bg-black/5',
            className
          )}
          to={link}
        >
          {children}
        </Link>
      ) : (
        <div
          className={clsx(
            'w-full px-5 py-3 rounded hover:bg-black/5 cursor-pointer',
            className
          )}
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </>
  )
}

export { DropdownItem }

export default Dropdown
