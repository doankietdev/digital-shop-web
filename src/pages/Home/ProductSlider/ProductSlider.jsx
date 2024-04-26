/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import noImage from '~/assets/logo.png'
import { Loading, Product } from '~/components'
import { routesConfig } from '~/config'
import { getProducts } from '~/services/productService'
import { CATEGORIES } from '~/utils/constants'
import { parsePlaceHolderUrl } from '~/utils/formatter'

const tabs = {
  bestSeller: {
    id: 1,
    name: 'best seller'
  },
  newArrivals: {
    id: 2,
    name: 'new arrivals'
  },
  tablet: {
    id: 3,
    name: 'tablet'
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
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
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
      if (activedTab === tabs.bestSeller.id) {
        const bestSellingResult = await getProducts({
          _sort: '-sold',
          _limit: 10
        })
        setProducts(bestSellingResult.products)
      } else if (activedTab === tabs.newArrivals.id) {
        const newArrivalsResult = await getProducts({
          _sort: '-createdAt',
          _limit: 10
        })
        setProducts(newArrivalsResult.products)
      } else if (activedTab === tabs.tablet.id) {
        const tabletResult = await getProducts({
          category: CATEGORIES.TABLET.ID
        })
        setProducts(tabletResult.products)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [activedTab])

  const handleClickTab = useCallback((e) => {
    setActivedTab(parseInt(e.target.dataset.id))
  }, [])

  return (
    <div className='md:col-span-3 h-full flex flex-col'>
      <div className='text-base md:text-xl uppercase font-semibold text-gray-400 mb-5 pb-2 lg:pb-4 border-b-2 border-primary-400'>
        {Object.keys(tabs).map((key, index, tabKeys) => {
          const tab = tabs[key]
          return (
            <span
              key={tab.id}
              className={clsx(
                {
                  'pr-3 lg:pr-5': index === 0,
                  'px-3 lg:px-5': index !== 0 && index !== tabKeys.length - 1,
                  'pl-3 lg:pl-5': index === tabKeys.length - 1,
                  'border-r': index !== tabKeys.length - 1,
                  '!text-black': tab.id === activedTab
                },
                'cursor-pointer'
              )}
              onClick={handleClickTab}
              data-id={tab.id}
            >
              {tab.name}
            </span>
          )
        })}
      </div>
      <div className='mx-[-10px] h-[430px] md:flex-1 md:h-auto'>
        {loading ? (
          <div className='h-full flex justify-center items-center'>
            <Loading />
          </div>
        ) : (
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
        )}
      </div>
      <div className='flex flex-col justify-between mt-5 gap-5 lg:flex-row  xl:gap-0'>
        <Link
          to={parsePlaceHolderUrl(routesConfig.productDetails, {
            slug: 'asus-rog-g752vm-1712644060821'
          })}
        >
          <div className='banner'>
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' ||
                noImage
              }
              alt='banner'
              className='w-full lg:h-[140px] object-contain'
            />
          </div>
        </Link>
        <Link
          to={parsePlaceHolderUrl(routesConfig.productDetails, {
            slug: 'hp-probook-450-1712644059490'
          })}
        >
          <div className='banner'>
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657' ||
                noImage
              }
              alt='banner'
              className='w-full lg:h-[140px] object-contain'
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default memo(ProductSlider)
