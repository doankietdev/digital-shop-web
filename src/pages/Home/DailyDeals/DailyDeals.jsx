/* eslint-disable react-refresh/only-export-components */
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FaEye, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import noImage from '~/assets/no-image.png'
import { Button, Card, Countdown, NoProductsAvailable, Rating } from '~/components'
import { routesConfig } from '~/config'
import { getProducts } from '~/services/productService'
import { formatCash, parsePlaceHolderUrl } from '~/utils/formatter'

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
    <Card className='relative p-[20px] md:col-span-1 h-full flex flex-col bg-white'>
      <h2 className='flex items-center font-semibold'>
        <FaStar className='text-[22px] text-primary-400' />
        <span className='text-xl text-[#505050] capitalize absolute left-[50%] translate-x-[-50%]'>
          Daily Deals
        </span>
      </h2>
      {loading ? (
        ''
      ) : (
        <div className='mt-4 flex flex-col lg:flex-1 items-center'>
          {product ? (
            <>
              <Link
                className='flex-1'
                to={parsePlaceHolderUrl(routesConfig.productDetails, {
                  slug: product.slug
                })}
              >
                <img
                  src={product?.thumb?.url || noImage}
                  alt={product?.title}
                  className='h-full object-contain'
                />
              </Link>
              <Link
                to={parsePlaceHolderUrl(routesConfig.productDetails, {
                  slug: product.slug
                })}
              >
                <h3 className='mt-4 lg:mt-0 hover:text-primary-400 line-clamp-1 md:line-clamp-2 lg:line-clamp-1 text-center transition-all duration-300 ease-in-out'>
                  {product.title}
                </h3>
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
                to={parsePlaceHolderUrl(routesConfig.productDetails, {
                  slug: product.slug
                })}
              >
                <Button
                  className='w-full'
                  icon={<FaEye size='17px' />}
                  primary
                  rounded
                >
                  View
                </Button>
              </Link>
            </>
          ) : (
            <NoProductsAvailable />
          )}
        </div>
      )}
    </Card>
  )
}

export default memo(DailyDeals)
