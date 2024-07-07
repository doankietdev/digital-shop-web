/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '~/hooks'
import { errorBorderClasses, errorMessageClasses } from '../classes'
import usePasswordToggle from '~/hooks/usePasswordToggle'

function PasswordFieldOutlined(
  { label, defaultValue, disabled, errorMessage, onChange, onBlur, name },
  ref
) {
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const containerRef = useRef()

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue)
    }
  }, [defaultValue])

  const [toggleIcon, inputType] = usePasswordToggle()

  const handleContainerClick = useCallback(() => {
    if (!focus && !disabled) {
      setFocus(true)
    }
  }, [focus, disabled])

  const handleInputChange = useCallback(
    (e) => {
      if (!disabled) {
        setInputValue(e.target.value)
      }
    },
    [disabled]
  )

  useOutsideClick(containerRef, () => {
    setFocus(false)
  })

  return (
    <div
      className={clsx(
        'relative border rounded-md w-full h-[40px] bg-white transition-all duration-300',
        {
          'border-black': focus && !errorMessage,
          'border-black/40': !focus && !errorMessage,
          [errorBorderClasses()]: errorMessage
        }
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <label
        className={clsx(
          'select-none text-[12px] absolute -top-[9px] left-[10px] bg-white px-[3px]',
          {
            'text-black/60': !errorMessage,
            [errorMessageClasses()]: errorMessage
          }
        )}
      >
        {label}
      </label>
      <input
        type={inputType}
        value={inputValue}
        className={clsx(
          'rounded-md h-full w-full p-[10px] focus:outline-none',
          {
            'pointer-events-none text-black/50': disabled
          }
        )}
        onChange={(e) => {
          handleInputChange(e)
          onChange(e)
        }}
        onBlur={onBlur}
        name={name}
        ref={ref}
      />
      <span className='select-none cursor-pointer absolute top-0 right-[10px] translate-y-1/2'>
        {toggleIcon}
      </span>
      {errorMessage && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
    </div>
  )
}

export default memo(forwardRef(PasswordFieldOutlined))
