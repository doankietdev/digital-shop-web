/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { memo, useCallback, useState } from 'react'
import { Dropdown } from '../Dropdowns'

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired
  })),
  defaultValues: PropTypes.array,
  onChange: PropTypes.func
}

function Filter({
  title,
  items,
  children,
  defaultValues = [],
  onChange = () => {}
}) {
  const [selectedValues, setSelectedValues] = useState(defaultValues)

  const handleClick = useCallback(
    (value) => {
      setSelectedValues((prevSelectedItems) => {
        const foundIndex = prevSelectedItems.indexOf(value)
        if (foundIndex > -1) {
          prevSelectedItems.splice(foundIndex, 1)
          const newSelectedItems = [...prevSelectedItems]
          onChange(newSelectedItems)
          return newSelectedItems
        }
        const newSelectedItems = [...prevSelectedItems, value]
        onChange(newSelectedItems)
        return newSelectedItems
      })
    },
    [onChange]
  )

  return (
    <Dropdown
      label={title}
      className='w-fit bg-[#F3F4F6] border rounded-lg'
      dropdownContainerClassName='left-0 bg-white p-4 w-[360px] origin-[12px_-10px]'
      itemContainerClassName='flex gap-2 items-center flex-wrap'
      arrowClassName='left-[12px] right-auto'
      bridgeClassName='left-0 right-auto w-[51px]'
    >
      {items?.map((item, index) => (
        <span
          onClick={() => handleClick(item.value)}
          key={index}
          className={clsx(
            'bg-[#F3F4F6] p-2 rounded cursor-pointer flex justify-center items-center border border-[#F3F4F6] select-none',
            {
              ' !border-primary-400 !bg-primary-400 !bg-opacity-10':
                selectedValues.includes(item.value)
            }
          )}
        >
          {item.name}
        </span>
      ))}
      {children}
    </Dropdown>
  )
}

export default memo(Filter)
