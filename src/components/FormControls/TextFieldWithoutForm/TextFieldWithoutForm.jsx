/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { errorMessageClasses, inputClasses } from '../classes'
import { forwardRef, useImperativeHandle, useRef } from 'react'

function TextField(
  {
    name = '',
    className = '',
    placeholder = '',
    primary,
    outlined,
    rounded,
    hasError,
    errorMessage,
    onFocus = () => {},
    onBlur = () => {}
  },
  ref
) {
  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))

  return (
    <div className='flex flex-col gap-1 w-full'>
      <input
        type='text'
        name={name}
        placeholder={placeholder}
        className={clsx(
          inputClasses({
            primary,
            outlined,
            rounded,
            hasError,
            className
          })
        )}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
      {hasError && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
    </div>
  )
}

export default forwardRef(TextField)
