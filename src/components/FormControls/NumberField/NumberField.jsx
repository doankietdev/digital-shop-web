import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { errorMessageClasses, inputClasses } from '../classes'

function NumberField({
  form = {},
  name = '',
  className = '',
  placeholder = '',
  hideArrows = false,
  primary = false,
  outlined = false,
  rounded = false
}) {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const { errors } = form.formState
    const error = errors[name]
    setHasError(!!error)
    if (!!error) {
      setErrorMessage(error.message)
    }
  }, [name, form.formState])

  return (
    <div className='flex flex-col gap-1 w-full'>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => {
          return (
            <input
              {...field}
              type='number'
              placeholder={placeholder}
              className={clsx(
                'py-[6px]',
                {
                  'hide-arrows': hideArrows
                },
                inputClasses({
                  primary,
                  outlined,
                  rounded,
                  hasError,
                  className
                })
              )}
            />
          )
        }}
      />
      {hasError && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
    </div>
  )
}

export default NumberField
