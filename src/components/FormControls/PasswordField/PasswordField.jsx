import { Controller } from 'react-hook-form'
import clsx from 'clsx'
import { inputClasses, errorMessageClasses } from '../classes'

function PasswordField({
  form,
  name,
  className,
  placeholder,
  primary,
  outlined,
  rounded
}) {
  const { formState } = form
  const { errors } = formState

  const hasError = !!errors[name]
  let errorMessage = ''
  if (hasError) {
    errorMessage = errors[name].message
  }

  return (
    <div className='flex flex-col gap-1'>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <input
            {...field}
            type='password'
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
          />
        )}
      />
      {hasError && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
    </div>
  )
}

export default PasswordField
