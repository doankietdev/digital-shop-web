/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { FaMinusIcon, FaPlusIcon } from '~/utils/icons'

function QuantityField({ min = 1, max, defaultValue = 1 }, ref) {
  const [value, setValue] = useState(defaultValue)
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    getValue: () => inputRef.current.value
  }))

  const handleDecrease = () => {
    setValue((prevValue) => (prevValue > min ? prevValue - 1 : prevValue))
  }

  const handleIncrease = () => {
    setValue((prevValue) => {
      if (max) {
        return prevValue < max ? prevValue + 1 : prevValue
      }
      return prevValue + 1
    })
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className='border rounded-sm'>
      <button
        className={clsx('px-2 py-[6px] border-r text-sm', {
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
        type='number'
        value={value}
        className='hide-arrows w-[50px] text-center'
        ref={inputRef}
        onChange={handleInputChange}
      />
      <button
        className={clsx('px-2 py-[6px] border-r text-sm', {
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

export default forwardRef(QuantityField)
