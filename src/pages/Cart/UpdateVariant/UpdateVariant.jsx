/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { memo, useCallback, useState } from 'react'
import { Dropdown } from '~/components/Dropdowns'

UpdateVariant.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      name: PropTypes.string
    })
  ),
  defaultValues: PropTypes.array,
  onChange: PropTypes.func
}

function UpdateVariant({
  title,
  items,
  defaultValues = [],
  onChange = () => {}
}) {
  const [selectedValues, setSelectedValues] = useState(defaultValues)

  const handleClick = useCallback(
    (value) => {
      setSelectedValues((prevSelectedItems) => {
        const foundIndex = prevSelectedItems.indexOf(value)
        if (foundIndex > -1) {
          return prevSelectedItems
        }
        const newSelectedItems = [value]
        onChange(newSelectedItems)
        return newSelectedItems
      })
    },
    [onChange]
  )

  return (
    <Dropdown
      label={title}
      className="px-2 py-1 w-fit bg-[#F3F4F6] border rounded-lg"
      dropdownContainerClassName="left-0 bg-white p-4 w-[360px]"
      itemContainerClassName="flex gap-2 items-center flex-wrap"
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
    </Dropdown>
  )
}

export default memo(UpdateVariant)
