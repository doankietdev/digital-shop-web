/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '~/hooks'
import { errorBorderClasses, errorMessageClasses } from '../classes'
import { ErrorWarningIcon } from '~/utils/icons'
import { isNumeric } from '~/utils/helpers'

function NumberFieldOutlined(
  {
    inputClassName = '',
    placeholder = '',
    textCenter = false,
    minLength,
    maxLength,
    label = '',
    defaultValue,
    disabled,
    errorMessage,
    onChange,
    onBlur,
    onInput,
    name
  },
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
        const value = e.target.value
        if (value.length > 0) {
          isNumeric(value) && setInputValue(value)
        } else {
          setInputValue('')
        }
      }
    },
    [disabled]
  )

  useOutsideClick(containerRef, () => {
    setFocus(false)
  })

  return (
    <div className='w-full'>
      <div
        className={clsx(
          'relative border rounded-md h-[40px] bg-white transition-all duration-300',
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
              'text-black/60': !errorMessage,
              [errorMessageClasses()]: errorMessage
            }
          )}
        >
          {label}
        </label>
        <input
          inputMode='numeric'
          placeholder={placeholder}
          value={inputValue}
          minLength={minLength}
          maxLength={maxLength}
          className={clsx(
            'rounded-md h-full w-full p-[10px] focus:outline-none text-[14px]',
            {
              'text-center': textCenter,
              'pointer-events-none text-black/50': disabled
            },
            inputClassName
          )}
          onChange={(e) => {
            handleInputChange(e)
            onChange(e)
          }}
          onBlur={onBlur}
          onInput={onInput}
          name={name}
          ref={ref}
        />
      </div>
      {errorMessage && (
        <p
          className={clsx(
            errorMessageClasses(),
            'mt-2 px-4 py-2 bg-red-50 rounded-md'
          )}
        >
          <ErrorWarningIcon className='icon mr-[6px]' />
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default memo(forwardRef(NumberFieldOutlined))
