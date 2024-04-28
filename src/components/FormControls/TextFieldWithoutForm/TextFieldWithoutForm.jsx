import clsx from 'clsx'
import { errorMessageClasses, inputClasses } from '../classes'

function TextField({
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
}) {
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
      />
      {hasError && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
    </div>
  )
}

export default TextField
