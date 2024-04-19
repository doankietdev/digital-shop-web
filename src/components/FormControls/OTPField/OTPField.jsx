import clsx from 'clsx'
import { useEffect, useLayoutEffect, useState } from 'react'
import { inputClasses } from '../classes'

let autoFocus = true

function OTPField({
  digits = 6,
  className = '',
  primary = false,
  outlined = false,
  rounded = false,
  // eslint-disable-next-line no-unused-vars
  onComplete = (otp) => {},
  onUnComplete = () => {}
}) {
  const [otp, setOtp] = useState(new Array(digits).fill(''))
  const [focusIndex, setFocusIndex] = useState(0)

  // handle focus into first input at first render
  useEffect(() => {
    autoFocus = false
  }, [])

  // handle on complete
  useEffect(() => {
    if (otp.includes('')) {
      onUnComplete()
      return
    }
    onComplete(otp.join(''))
  }, [onComplete, onUnComplete, otp])

  // handle enter digit of OTP
  const handleChange = (e, currentIndex) => {
    const element = e.target
    if (isNaN(element.value)) return

    setOtp((prevOtp) => [
      ...prevOtp.map((digit, index) =>
        index === currentIndex ? element.value : digit
      )
    ])

    if (!element.value) return

    if (element.nextSibling) {
      element.nextSibling.focus()
      setFocusIndex((prev) => prev + 1)
      return
    }
  }

  // handle delete
  const handleKeyDown = (e, currentIndex) => {
    if (e.keyCode !== 8 || currentIndex === 0) return

    const currentElement = e.target

    if (!currentElement.nextSibling && currentElement.value) {
      setOtp((prevOtp) => [
        ...prevOtp.map((digit, index) => (index === currentIndex ? '' : digit))
      ])
      currentElement.focus()
      return
    }

    setOtp((prevOtp) => [
      ...prevOtp.map((digit, index) =>
        index === currentIndex - 1 ? '' : digit
      )
    ])
    currentElement.previousSibling?.focus()
    setFocusIndex((prev) => prev - 1)
  }

  return (
    <div className='flex justify-center gap-[10px] w-[80%]'>
      {otp.map((digit, index) => (
        <input
          key={index}
          value={digit}
          type='text'
          maxLength={1}
          autoFocus={index === 0 && autoFocus}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={clsx(
            {
              disabled: focusIndex !== index,
              'border-2': focusIndex === index
            },
            inputClasses({
              primary,
              outlined,
              rounded,
              hasError: false,
              className
            }),
            'hide-arrows w-[48px] h-[48px] text-center text-[18px] font-medium'
          )}
        />
      ))}
    </div>
  )
}

export default OTPField
