import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import TimePartial from './TimePartial'

const MILLISECONDS_1_DAY = 1000 * 60 * 60 * 24
const MILLISECONDS_1_HOUR = 1000 * 60 * 60
const MILLISECONDS_1_MINUTE = 1000 * 60
const MILLISECONDS_1_SECOND = 1000

function Countdown({ endTime, className, onTimeOut }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timerId, setTimerId] = useState(null)
  const [distance, setDistance] = useState(endTime - Date.now())

  useEffect(() => {
    if (distance > 0) {
      setDays(Math.floor(distance / MILLISECONDS_1_DAY))
      setHours(
        Math.floor((distance % MILLISECONDS_1_DAY) / MILLISECONDS_1_HOUR)
      )
      setMinutes(
        Math.floor((distance % MILLISECONDS_1_HOUR) / MILLISECONDS_1_MINUTE)
      )
      setSeconds(
        Math.floor((distance % MILLISECONDS_1_MINUTE) / MILLISECONDS_1_SECOND)
      )
    } else {
      clearInterval(timerId)
      onTimeOut()
    }
  }, [distance, onTimeOut, timerId])

  useEffect(() => {
    setTimerId(
      setInterval(() => {
        setDistance(endTime - Date.now())
      }, 1000)
    )

    return () => {
      clearInterval(timerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime])

  return (
    <div className={clsx(className, 'flex gap-1')}>
      <TimePartial label='Days' number={days} />
      <TimePartial label='Hours' number={hours} />
      <TimePartial label='Minutes' number={minutes} />
      <TimePartial label='Seconds' number={seconds} />
    </div>
  )
}

export default Countdown
