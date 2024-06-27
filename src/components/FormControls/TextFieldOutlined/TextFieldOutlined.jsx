/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '~/hooks'
import { errorBorderClasses, errorMessageClasses } from '../classes'

function TextFieldOutlined(
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
          'text-[12px] absolute -top-[9px] left-[10px] bg-white px-[3px]',
          {
            'text-black/50': !errorMessage,
            [errorMessageClasses()]: errorMessage
          }
        )}
      >
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        className={clsx(
          'h-full w-full p-[10px] focus:outline-none bg-transparent',
          {
            'pointer-events-none': disabled
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
      {errorMessage && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
    </div>
  )
}

export default memo(forwardRef(TextFieldOutlined))
