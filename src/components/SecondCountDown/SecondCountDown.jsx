/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo, useEffect, useState, useRef } from 'react'

function SecondCountDown({
  initialSeconds = 0,
  className = '',
  primary = false,
  onTimeout = () => {} }) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds * 1000)
  const intervalRef = useRef()

  useEffect(() => {
    setTimeLeft(initialSeconds * 1000)
  }, [initialSeconds])

  useEffect(() => {
    if (timeLeft <= 0) return

    const startTime = Date.now()
    const endTime = startTime + timeLeft

    const tick = () => {
      const now = Date.now()
      const newTimeLeft = Math.max(0, endTime - now)
      setTimeLeft(newTimeLeft)

      if (newTimeLeft > 0) {
        intervalRef.current = requestAnimationFrame(tick)
      } else {
        onTimeout()
      }
    }

    intervalRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(intervalRef.current)
  }, [onTimeout, timeLeft])

  const seconds = Math.floor(timeLeft / 1000)

  return (
    <div
      className={clsx(
        `border-2 rounded-full w-[40px] h-[40px] font-semibold
          text-[14px] flex justify-center items-center select-none`,
        {
          'border-primary-400 text-primary-400': primary,
          'border-black': !primary
        },
        className
      )}
    >
      {seconds}
    </div>
  )
}

export default memo(SecondCountDown)
