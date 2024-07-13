/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import Slider from 'react-slick'
import bestSellingImage from '~/assets/best-selling.png'
import { NoProductsAvailable, Product, ProductSkeleton } from '~/components'
import { ReactSlickArrow } from '~/customLibraries/components'
import { getProducts } from '~/services/productService'
import {
  CATEGORIES,
  PRODUCT_CONDITIONS_TO_CHECK
} from '~/utils/constants'
import { MdArrowBackIosNewIcon, MdArrowForwardIosIcon } from '~/utils/icons'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
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
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
}

function BestSellingLaptop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const result = await getProducts({
        category: CATEGORIES.LAPTOP.ID,
        'sold[gte]': PRODUCT_CONDITIONS_TO_CHECK.SOLD,
        _sort: '-createdAt'
      })

      const products = result.products
      if (products.length < settings.slidesToShow) {
        settings.autoplay = false
        settings.arrows = false
      }
      setProducts(products)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <div className='col-span-9 flex flex-col'>
      <h2 className='capitalize font-semibold text-[18px] md:text-[20px] flex gap-2 mb-5 pb-2 lg:pb-4 border-b-2 border-primary-400'>
        <img src={bestSellingImage} className='h-7' />
        Best Selling Laptop
      </h2>
      <div className={clsx('mx-[-10px]')}>
        {loading && (
          <Slider {...settings}>
            {new Array(10).fill(0).map((ele, index) => (
              <ProductSkeleton key={index} />
            ))}
          </Slider>
        )}
        {!loading && products.length ? (
          <Slider {...settings}>
            {products.map((product) => (
              <Product
                key={product._id}
                product={product}
                showLabel
                autoLabel
              />
            ))}
          </Slider>
        ) : (
          <NoProductsAvailable />
        )}
      </div>
    </div>
  )
}

export default memo(BestSellingLaptop)
