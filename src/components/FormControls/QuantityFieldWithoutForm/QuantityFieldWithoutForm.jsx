/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { useCallback, useEffect } from 'react'
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

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

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
      const oldValue = e.target.value
      let value = e.target.value

      if (value > max) {
        value = max
      }
      onChange({ quantity: value, oldQuantity: oldValue })
      setValue(value)
    },
    [disabled, max, onChange]
  )

  return (
    <div className="border rounded-sm flex w-fit">
      <button
        className={clsx('px-2 py-[6px] border-r text-sm bg-white', {
          'hover:bg-gray-200 transition-all duration-200 ease-in-out':
            value > 1 || !disabled,
          'cursor-not-allowed opacity-70': value <= 1 || disabled
        })}
        onClick={handleDecrease}
      >
        <FaMinusIcon className={clsx('inline-block')} />
      </button>
      <input
        type="number"
        value={value}
        className="hide-arrows w-[50px] text-center"
        disabled={disabled}
        onChange={handleInputChange}
      />
      <button
        className={clsx('px-2 py-[6px] border-l text-sm bg-white', {
          'hover:bg-gray-200 transition-all duration-200 ease-in-out': max
            ? value < max && !disabled
            : true,
          'cursor-not-allowed opacity-70': value >= max || disabled
        })}
        onClick={handleIncrease}
      >
        <FaPlusIcon className={clsx('inline-block')} />
      </button>
    </div>
  )
}

export default memo(QuantityFieldWithoutForm)
