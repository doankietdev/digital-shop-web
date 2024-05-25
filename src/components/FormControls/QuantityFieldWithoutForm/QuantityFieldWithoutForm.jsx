/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { useCallback, useEffect } from 'react'
import { memo, useState } from 'react'
import { FaMinusIcon, FaPlusIcon } from '~/utils/icons'

function QuantityFieldWithoutForm({
  min = 1,
  max,
  defaultValue = 1,
  onChange = () => {}
}) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleDecrease = useCallback(() => {
    setValue((prevValue) => {
      const nextValue = prevValue > min ? prevValue - 1 : prevValue
      onChange(nextValue)
      return nextValue
    })
  }, [min, onChange])

  const handleIncrease = useCallback(() => {
    setValue((prevValue) => {
      let nextValue = prevValue + 1 // default if not max
      if (max) {
        nextValue = prevValue < max ? prevValue + 1 : prevValue
      }
      onChange(nextValue)
      return nextValue
    })
  }, [max, onChange])

  const handleInputChange = useCallback((e) => {
    let value = e.target.value

    if (value > max) {
      value = max
    }
    setValue(value)
    onChange(value)
  }, [max, onChange])

  return (
    <div className="border rounded-sm flex w-fit">
      <button
        className={clsx('px-2 py-[6px] border-r text-sm bg-white', {
          'hover:bg-gray-200 transition-all duration-200 ease-in-out':
            value > 1,
          'cursor-not-allowed': value <= 1
        })}
        onClick={handleDecrease}
      >
        <FaMinusIcon
          className={clsx('inline-block', {
            'opacity-50': value <= 1
          })}
        />
      </button>
      <input
        type="number"
        value={value}
        className="hide-arrows w-[50px] text-center"
        onChange={handleInputChange}
      />
      <button
        className={clsx('px-2 py-[6px] border-l text-sm bg-white', {
          'hover:bg-gray-200 transition-all duration-200 ease-in-out': max
            ? value < max
            : true,
          'cursor-not-allowed': value >= max
        })}
        onClick={handleIncrease}
      >
        <FaPlusIcon
          className={clsx('inline-block', {
            'opacity-50': value >= max
          })}
        />
      </button>
    </div>
  )
}

export default memo(QuantityFieldWithoutForm)
