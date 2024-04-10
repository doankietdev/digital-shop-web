import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaEye } from 'react-icons/fa'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { Countdown, Rating, Button } from '~/components'
import { getProducts } from '~/services/productsServices'
import { formatCash } from '~/utils/formatter'
import noImage from '~/assets/no-image.png'
import { routesConfig } from '~/config'

const MAX_REQUEST = 3

function DailyDeals() {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [expiredDeal, setExpiredDeal] = useState(true)
  const countRequest = useRef(0)

  useEffect(() => {
    const fetchProduct = async () => {
      const productsResult = await getProducts()
      countRequest.current = countRequest.current + 1
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
        setProduct(products[0])
        setExpiredDeal(false)
      } else {
        setProduct((prev) => prev)
      }
      setLoading(false)
    }

    if (!product || (countRequest.current < MAX_REQUEST && expiredDeal)) {
      fetchProduct()
    }
  }, [expiredDeal, product])

  const onCountdownTimeOut = useCallback(() => {
    setExpiredDeal(true)
  }, [])

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
          {product ? (
            <>
              <Link
                className='flex-1'
                to={routesConfig.productDetails(product.slug)}
              >
                <img
                  src={product?.thumb || noImage}
                  alt={product?.title}
                  className='h-full object-contain'
                />
              </Link>
              <Link to={routesConfig.productDetails(product.slug)}>
                <h3 className='mt-4 hover:text-main'>{product.title}</h3>
              </Link>
              <Rating
                className='mt-2'
                averageRatings={product.averageRatings}
                size='17px'
              />
              <div className='mt-2 flex items-center'>
                {product.oldPrice ? (
                  <span className='mr-3 text-sm text-gray-500 line-through'>
                    {formatCash(product.oldPrice)}
                  </span>
                ) : (
                  ''
                )}
                <span>{formatCash(product.price)}</span>
              </div>
              <Countdown
                key={product._id}
                onTimeOut={onCountdownTimeOut}
                endTime={product.discounts[0]?.expireAt}
                className='mt-[15px]'
              />
              <Link
                className='mt-4 w-full'
                to={routesConfig.productDetails(product.slug)}
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
