import { Controller } from 'react-hook-form'
import { inputClasses, errorMessageClasses } from '../classes'

function TextField({
  form,
  name,
  className,
  placeholder,
  primary,
  outlined,
  rounded
}) {
  const { formState } = form
  const { touchedFields, errors } = formState

  const hasError = !!(touchedFields[name] && errors[name])
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
            type='text'
            placeholder={placeholder}
            className={inputClasses({
              primary,
              outlined,
              rounded,
              hasError,
              className
            })}
          />
        )}
      />
      {hasError && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
    </div>
  )
}

export default TextField
