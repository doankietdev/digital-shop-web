/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import bestSellingImage from '~/assets/best-selling.png'
import giftImage from '~/assets/gift.png'
import noImage from '~/assets/logo.png'
import newImage from '~/assets/new.png'
import { NoProductsAvailable, Product, ProductSkeleton } from '~/components'
import { routesConfig } from '~/config'
import { ReactSlickArrow } from '~/customLibraries/components'
import { getProducts } from '~/services/productService'
import { PRODUCT_CONDITIONS_TO_CHECK } from '~/utils/constants'
import { parsePlaceHolderUrl } from '~/utils/formatter'
import { MdArrowBackIosNewIcon, MdArrowForwardIosIcon } from '~/utils/icons'

const tabs = {
  bigDiscounts: {
    id: 1,
    iconImage: giftImage,
    name: 'Big Discounts'
  },
  bestSeller: {
    id: 2,
    iconImage: bestSellingImage,
    name: 'Best Selling'
  },
  newArrivals: {
    id: 3,
    iconImage: newImage,
    name: 'New Arrivals'
  }
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
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
        slidesToShow: 3,
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

function ProductSlider() {
  const [activedTab, setActivedTab] = useState(1)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      let products = []
      if (activedTab === tabs.bigDiscounts.id) {
        const allProductsResult = await getProducts()
        products = allProductsResult.products.filter(
          (product) =>
            product.oldPrice - product.price >=
            PRODUCT_CONDITIONS_TO_CHECK.BIG_DISCOUNTS
        )
      } else if (activedTab === tabs.bestSeller.id) {
        const bestSellingResult = await getProducts({
          _sort: '-sold',
          _limit: 50
        })
        products = bestSellingResult.products
      } else if (activedTab === tabs.newArrivals.id) {
        const newArrivalsResult = await getProducts({
          _sort: '-createdAt',
          _limit: 50
        })
        products = newArrivalsResult.products
      }

      // fix number of sliders less than slidesToShow
      if (products.length < settings.slidesToShow) {
        settings.autoplay = false
        settings.arrows = false
      }

      setProducts(products)
      setLoading(false)
    }
    fetchProducts()
  }, [activedTab])

  const handleClickTab = useCallback((tabId) => {
    setActivedTab(tabId)
  }, [])

  return (
    <div className='md:col-span-3 h-full flex flex-col'>
      <div className='flex-1 flex flex-col'>
        <div
          className='text-base md:text-xl font-semibold text-gray-400 pb-2
            lg:pb-4 border-b-2 border-primary-400 flex'
        >
          {Object.keys(tabs).map((key, index, tabKeys) => {
            const tab = tabs[key]
            return (
              <div
                key={tab.id}
                className={clsx('flex items-center gap-2 cursor-pointer', {
                  'pr-3 lg:pr-5': index === 0,
                  'px-3 lg:px-5': index !== 0 && index !== tabKeys.length - 1,
                  'pl-3 lg:pl-5': index === tabKeys.length - 1,
                  'border-r': index !== tabKeys.length - 1
                })}
                onClick={() => handleClickTab(tab.id)}
              >
                <img src={tab.iconImage} className='h-[32px] object-contain' />
                <span
                  className={clsx(
                    'text-center',
                    {
                      '!text-black': tab.id === activedTab
                    })}
                >
                  {tab.name}
                </span>
              </div>
            )
          })}
        </div>
        <div className='mx-[-10px] md:flex-1 md:h-auto'>
          {loading ? (
            <Slider {...settings} className='mt-5'>
              {new Array(10).fill(0).map((ele, index) => (
                <ProductSkeleton key={index} />
              ))}
            </Slider>
          ) : products.length ? (
            <Slider {...settings} className='mt-5'>
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
      <div className='flex flex-col justify-between mt-5 gap-5 lg:flex-row  xl:gap-0'>
        <Link
          to={parsePlaceHolderUrl(routesConfig.productDetails, {
            slug: 'apple-watch-edition-series-2-1714411875510'
          })}
        >
          <div className='banner'>
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
                  || noImage
              }
              alt='banner'
              className='w-full lg:h-[140px] object-contain rounded'
            />
          </div>
        </Link>
        <Link
          to={parsePlaceHolderUrl(routesConfig.productDetails, {
            slug: 'acer-aspire-e5-1714411875642'
          })}
        >
          <div className='banner'>
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                  || noImage
              }
              alt='banner'
              className='w-full lg:h-[140px] object-contain rounded'
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default memo(ProductSlider)
