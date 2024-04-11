import { useCallback, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Loading, Product } from '~/components'
import { getProducts } from '~/services/productsServices'
import {
  CATEGORIES,
  PRODUCT_CONDITIONS_TO_CHECK,
  TIME
} from '~/utils/constants'

const tabs = {
  smartphone: {
    id: 1,
    name: 'Smartphone'
  },
  tablet: {
    id: 2,
    name: 'Table'
  },
  laptop: {
    id: 3,
    name: 'Laptop'
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

function NewArrivals() {
  const [activedTab, setActivedTab] = useState(1)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const MILLISECONDS_NEW_DISTANCE_DAY =
        Date.now() -
        PRODUCT_CONDITIONS_TO_CHECK.NEW_DISTANCE_DAY * TIME.MILLISECONDS_1_DAY

      if (activedTab === tabs.smartphone.id) {
        const smartPhoneResult = await getProducts({
          category: CATEGORIES.SMARTPHONE.ID,
          'createdAt[gte]': MILLISECONDS_NEW_DISTANCE_DAY,
          _sort: '-createdAt',
          _limit: 10
        })
        setProducts(smartPhoneResult.products)
      } else if (activedTab === tabs.tablet.id) {
        const tabletResult = await getProducts({
          category: CATEGORIES.TABLET.ID,
          'createdAt[gte]': MILLISECONDS_NEW_DISTANCE_DAY,
          _sort: '-createdAt',
          _limit: 10
        })
        setProducts(tabletResult.products)
      } else if (activedTab === tabs.laptop.id) {
        const laptopResult = await getProducts({
          category: CATEGORIES.LAPTOP.ID,
          'createdAt[gte]': MILLISECONDS_NEW_DISTANCE_DAY,
          _sort: '-createdAt',
          _limit: 10
        })
        setProducts(laptopResult.products)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [activedTab])

  const handleClickTab = useCallback((e) => {
    setActivedTab(parseInt(e.target.dataset.id))
  }, [])

  return (
    <div className='col-span-9 flex flex-col h-[550px]'>
      <div className='mb-5 pb-[15px] border-b-2 border-main flex justify-between items-center'>
        <h2 className='uppercase font-semibold text-xl'>NEW ARRIVALS</h2>
        <div className='font-medium text-sm text-gray-400'>
          {Object.keys(tabs).map((key, index) => {
            const tab = tabs[key]
            return (
              <span
                key={tab.id}
                className={`cursor-pointer capitalize  ${
                  index === 0 ? 'pr-5' : 'px-5'
                } ${index === tabs.length - 1 ? '' : 'border-r'} ${
                  tab.id === activedTab ? '!text-[#000]' : ''
                }`}
                onClick={handleClickTab}
                data-id={tab.id}
              >
                {tab.name}
              </span>
            )
          })}
        </div>
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
    </div>
  )
}

export default NewArrivals
