import { useCallback, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Loading, Product } from '~/components'
import { getProducts } from '~/services/productsServices'
import noImage from '~/assets/logo.png'
import './ProductSlider.css'

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
          category: '6614dfc184a5a023303a96c8'
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
    <div className='col-span-9'>
      <div className='uppercase font-medium text-lg text-gray-400 mb-5 pb-[15px] border-b-2 border-main'>
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
      <div className='mx-[-10px]'>
        {loading ? (
          <div className='flex justify-center pt-[44px]'>
            <Loading />
          </div>
        ) : (
          <Slider {...settings}>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Slider>
        )}
      </div>
      <div className='flex justify-between mt-5'>
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
      </div>
    </div>
  )
}

export default ProductSlider
