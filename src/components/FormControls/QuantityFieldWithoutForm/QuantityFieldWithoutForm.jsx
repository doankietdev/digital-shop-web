/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { useCallback, useEffect, useRef } from 'react'
import { memo, useState } from 'react'
import { FaMinusIcon, FaPlusIcon } from '~/utils/icons'

function QuantityFieldWithoutForm({
  min = 1,
  max,
  defaultValue = 1,
  disabled = false,
  // eslint-disable-next-line no-unused-vars
  onChange = ({ quantity, oldQuantity }) => {}
}) {
  const [value, setValue] = useState(defaultValue)
  const initialValue = useRef(null)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (value !== '' && initialValue.current === null) {
      initialValue.current = value
    }
  }, [value])

  const handleDecrease = useCallback(() => {
    if (disabled) return
    setValue((prevValue) => {
      const nextValue = prevValue > min ? prevValue - 1 : prevValue
      onChange({ quantity: nextValue, oldQuantity: prevValue })
      return nextValue
    })
  }, [disabled, min, onChange])

  const handleIncrease = useCallback(() => {
    if (disabled) return
    setValue((prevValue) => {
      let nextValue = prevValue + 1 // default if not max
      if (max) {
        nextValue = prevValue < max ? prevValue + 1 : prevValue
      }
      onChange({ quantity: nextValue, oldQuantity: prevValue })
      return nextValue
    })
  }, [disabled, max, onChange])

  const handleInputChange = useCallback(
    (e) => {
      if (disabled) return

      let value = parseInt(e.target.value)
      if (value > max) {
        value = max
      }
      onChange({ quantity: value, oldQuantity: initialValue.current })
      // case: input has 1 digit, after input empty
      if (value) {
        initialValue.current = null
      }
      setValue(value)
    },
    [disabled, max, onChange]
  )

  return (
    <div className="border rounded-sm flex w-fit">
      <button
        className={clsx('px-[6px] py-[4px] md:px-[8px] md:py-[6px] border-r text-sm bg-white', {
          'hover:bg-gray-200 transition-all duration-200 ease-in-out':
            value > 1 && !disabled,
          'cursor-not-allowed opacity-50': value <= 1 || disabled
        })}
        onClick={handleDecrease}
      >
        <FaMinusIcon className={clsx('inline-block')} />
      </button>
      <input
        type="number"
        value={value}
        className="hide-arrows w-[40px] md:w-[50px] text-center text-[12px] md:text-[14px]"
        disabled={disabled}
        onChange={handleInputChange}
      />
      <button
        className={clsx('px-[6px] py-[4px] md:px-[8px] md:py-[6px]  border-l text-sm bg-white', {
          'hover:bg-gray-200 transition-all duration-200 ease-in-out': max
            ? value < max && !disabled
            : true,
          'cursor-not-allowed opacity-50': value >= max || disabled
        })}
        onClick={handleIncrease}
      >
        <FaPlusIcon className={clsx('inline-block')} />
      </button>
    </div>
  )
}

export default memo(QuantityFieldWithoutForm)
