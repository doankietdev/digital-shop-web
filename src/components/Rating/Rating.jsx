import { useEffect, useState } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import clsx from 'clsx'

function Rating({ className, averageRatings, size }) {
  const [stars, setStars] = useState([])

  useEffect(() => {
    for (let i = 1; i <= averageRatings; i++) {
      setStars((prevStars) => [...prevStars, FaStar])
    }
    for (let i = 5; i > averageRatings; i--) {
      setStars((prevStars) => [...prevStars, FaRegStar])
    }

    return () => {
      setStars([])
    }
  }, [averageRatings])

  return (
    <div className={clsx(className, 'flex gap-[2px]')}>
      {stars.map((Star, index) => (
        <Star size={size} className='text-[#ffb400]' key={index} />
      ))}
    </div>
  )
}

export default Rating
