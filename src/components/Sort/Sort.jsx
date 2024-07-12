import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

Sort.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.element,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  }))
}

function Sort({ items, onChange }) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleClick = useCallback((index) => {
    onChange(items[index]?.value)
    setSelectedIndex(index)
  }, [items, onChange])

  return (
    <div className='flex gap-3'>
      {items.map((item, index) => (
        <button
          key={index}
          className={clsx(
            `flex items-center basis-1/3 md:basis-auto text-[12px] md:text-[14px] font-medium
              text-gray-900 md:me-0 min-w-[32px] px-[8px] py-[4px] w-fit bg-[#F3F4F6] border rounded-lg`,
            {
              '!border-primary-400 !bg-primary-400 !bg-opacity-10':
                index === selectedIndex
            }
          )}
          onClick={() => handleClick(index)}
        >
          <span className='mr-2'>
            {item.icon}
          </span>
          <span className='text-center'>
            {item.name}
          </span>
        </button>
      ))}
    </div>
  )
}

export default Sort
