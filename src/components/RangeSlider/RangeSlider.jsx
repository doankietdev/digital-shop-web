/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from 'react'
import Slider from 'rc-slider'
import { formatCash } from '~/utils/formatter'

function RangeSlider({ min, max, defaultValue, cash, onChangeComplete }) {
  const [startValue, setStartValue] = useState(defaultValue[0])
  const [endValue, setEndValue] = useState(defaultValue[1])
  const handleChange = (values) => {
    setStartValue(values[0])
    setEndValue(values[1])
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-4'>
        {cash ? (
          <>
            <span className='text-[#4A4A4A]'>{formatCash(startValue)}</span>
            <span className='text-[#4A4A4A]'>{formatCash(endValue)}</span>
          </>
        ) : (
          <>
            <span className='text-[#4A4A4A]'>{startValue}</span>
            <span className='text-[#4A4A4A]'>{endValue}</span>
          </>
        )}
      </div>
      <Slider
        range
        allowCross={false}
        defaultValue={defaultValue}
        min={min}
        max={max}
        keyboard
        onChange={handleChange}
        onChangeComplete={onChangeComplete}
      />
    </div>
  )
}

export default memo(RangeSlider)
