/* eslint-disable react-refresh/only-export-components */
import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import noImage from '~/assets/logo.png'
import { Loading, Product } from '~/components'
import { routesConfig } from '~/config'
import { getProducts } from '~/services/productService'
import { CATEGORIES } from '~/utils/constants'

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
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000
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
    <div className='col-span-9 h-full flex flex-col'>
      <div className='uppercase font-semibold text-xl text-gray-400 mb-5 pb-[15px] border-b-2 border-main'>
        {Object.keys(tabs).map((key, index) => {
          const tab = tabs[key]
          return (
            <span
              key={tab.id}
              className={`cursor-pointer ${index === 0 ? 'pr-5' : 'px-5'} ${
                index === tabs.length - 1 ? '' : 'border-r'
              } ${tab.id === activedTab ? '!text-[#000]' : ''}`}
              onClick={handleClickTab}
              data-id={tab.id}
            >
              {tab.name}
            </span>
          )
        })}
      </div>
      <div className='mx-[-10px] flex-1'>
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
      <div className='flex justify-between mt-5'>
        <Link to={routesConfig.productDetails('asus-rog-g752vm-1712644060821')}>
          <div className='banner'>
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' ||
                noImage
              }
              alt='banner'
              className='w-[440px] h-[140px] object-cover'
            />
          </div>
        </Link>
        <Link to={routesConfig.productDetails('hp-probook-450-1712644059490')}>
          <div className='banner'>
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657' ||
                noImage
              }
              alt='banner'
              className='w-[440px] h-[140px] object-cover'
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default memo(ProductSlider)
