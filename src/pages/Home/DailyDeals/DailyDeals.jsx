import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaEye } from 'react-icons/fa'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { Countdown, Rating, Button } from '~/components'
import { getProducts } from '~/services/productsServices'
import { formatCash } from '~/utils/formatter'
import noImage from '~/assets/no-image.png'
import { routesConfig } from '~/config'

function DailyDeals() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [productIndex, setProductIndex] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const productsResult = await getProducts()
      const products = productsResult.products.filter(
        (product) => product.discounts && !!product.discounts.length
      )

      if (products.length) {
        // sort descending by discount amount
        products.sort((current, next) => {
          const currentDiscountAmount = current.old - current.price
          const nextDiscountAmount = next.old - next.price
          return nextDiscountAmount - currentDiscountAmount
        })
        setProducts(products)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const onCountdownTimeOut = useCallback(() => {
    setProductIndex((prevIndex) => {
      if (prevIndex === products.length - 1) {
        return prevIndex
      }
      return prevIndex + 1
    })
  }, [products.length])

  return (
    <div className='relative p-[20px] col-span-3 border h-full flex flex-col'>
      <h2 className='flex items-center text-xl font-semibold'>
        <FaStar className='text-main' />
        <span className='text-[#505050] uppercase absolute left-[50%] translate-x-[-50%]'>
          DAILY DEALS
        </span>
      </h2>
      {loading ? (
        ''
      ) : (
        <div className='mt-4 flex flex-col flex-1 items-center'>
          {products[productIndex] ? (
            <>
              <Link
                className='flex-1'
                to={routesConfig.productDetails(products[productIndex].slug)}
              >
                <img
                  src={products[productIndex]?.thumb || noImage}
                  alt={products[productIndex]?.title}
                  className='h-full object-contain'
                />
              </Link>
              <Link
                to={routesConfig.productDetails(products[productIndex].slug)}
              >
                <h3 className='mt-4 hover:text-main'>
                  {products[productIndex].title}
                </h3>
              </Link>
              <Rating
                className='mt-2'
                averageRatings={products[productIndex].averageRatings}
                size='17px'
              />
              <div className='mt-2 flex items-center'>
                {products[productIndex].oldPrice ? (
                  <span className='mr-3 text-sm text-gray-500 line-through'>
                    {formatCash(products[productIndex].oldPrice)}
                  </span>
                ) : (
                  ''
                )}
                <span>{formatCash(products[productIndex].price)}</span>
              </div>
              <Countdown
                key={products[productIndex]._id}
                onTimeOut={onCountdownTimeOut}
                endTime={products[productIndex].discounts[0]?.expireAt}
                className='mt-[15px]'
              />
              <Link
                className='mt-4 w-full'
                to={routesConfig.productDetails(products[productIndex].slug)}
              >
                <Button className='w-full' icon={<FaEye size='17px' />} primary>
                  View
                </Button>
              </Link>
            </>
          ) : (
            <div className='flex flex-1 justify-center items-center gap-1 text-[20px]'>
              <MdOutlineErrorOutline className='inline-block' />
              <span>No Products</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DailyDeals
