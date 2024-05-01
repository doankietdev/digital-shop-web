import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import TimePartial from './TimePartial'
import { TIME } from '~/utils/constants'

function Countdown({ endTime, className, onTimeOut }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timerId = useRef(null)

  useEffect(() => {
    timerId.current = setInterval(() => {
      const distance = endTime - Date.now()
      if (distance > 0) {
        setDays(Math.floor(distance / TIME.MILLISECONDS_1_DAY))
        setHours(
          Math.floor(
            (distance % TIME.MILLISECONDS_1_DAY) / TIME.MILLISECONDS_1_HOUR
          )
        )
        setMinutes(
          Math.floor(
            (distance % TIME.MILLISECONDS_1_HOUR) / TIME.MILLISECONDS_1_MINUTE
          )
        )
        setSeconds(
          Math.floor(
            (distance % TIME.MILLISECONDS_1_MINUTE) / TIME.MILLISECONDS_1_SECOND
          )
        )
      } else {
        clearInterval(timerId.current)
        onTimeOut()
      }
    }, 1000)

    return () => {
      clearInterval(timerId.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime])

  return (
    <div
      className={clsx(
        className,
        'flex md:flex-col lg:flex-row gap-1 md:gap-0 lg:gap-1'
      )}
    >
      <TimePartial label='Days' number={days} />
      <TimePartial label='Hours' number={hours} />
      <TimePartial label='Minutes' number={minutes} />
      <TimePartial label='Seconds' number={seconds} />
    </div>
  )
}

export default Countdown
