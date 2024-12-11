/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { ReactSlickArrow } from '~/customLibraries/components'
import { MdArrowBackIosNewIcon, MdArrowForwardIosIcon } from '~/utils/icons'

const SLIDES = [
  {
    LINK: '',
    BANNER: 'https://digital-world-store.myshopify.com/cdn/shop/files/moto-360-2nd-gen-official_800x.png?v=1613565244'
  },
  {
    LINK: '',
    BANNER: 'https://digital-world-store.myshopify.com/cdn/shop/files/slideshow2_800x.png?v=1613565244'
  },
  {
    LINK: '',
    BANNER: 'https://vcdn1-sohoa.vnecdn.net/2023/09/02/iPhone-15-Pro-Colors-Mock-Featur-1693595134.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=gTSThVWo6-yf-54GHjM64w'
  },
  {
    LINK: '',
    BANNER: 'https://digital-world-store.myshopify.com/cdn/shop/files/slideshow4_800x.png?v=1613565623'
  },
  {
    LINK: '',
    BANNER: 'https://digital-world-store.myshopify.com/cdn/shop/files/slideshow5_800x.png?v=1613565623'
  }
]


const settings = {
  infinite: true,
  speed: 1000,
  autoplay: true,
  fade: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: (
    <ReactSlickArrow>
      <MdArrowBackIosNewIcon />
    </ReactSlickArrow>
  ),
  nextArrow: (
    <ReactSlickArrow>
      <MdArrowForwardIosIcon />
    </ReactSlickArrow>
  )
}

function Banners() {
  return (
    <div className='mt-[38px] md:mt-5 lg:mt-0 shadow-card lg:col-span-3 h-full'>
      <Slider {...settings} className='h-full'>
        {SLIDES.map((SLIDE, index) => (
          <Link key={index} to={SLIDE.LINK} className='h-full'>
            <img
              src={SLIDE.BANNER}
              className="w-full h-full rounded"
            />
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default memo(Banners)
