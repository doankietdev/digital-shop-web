/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react'

function Slider() {
  return (
    <div className='md:col-span-3 pt-[36px] md:pt-[28px] lg:pt-0'>
      <img
        src='https://vcdn1-sohoa.vnecdn.net/2023/09/02/iPhone-15-Pro-Colors-Mock-Featur-1693595134.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=gTSThVWo6-yf-54GHjM64w'
        alt='slider'
        className='w-full object-contain rounded'
      />
    </div>
  )
}

export default memo(Slider)
