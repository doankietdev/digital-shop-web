/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { routesConfig } from '~/config'
import { useOutsideClick } from '~/hooks'
import { searchProducts } from '~/services/productService'
import { formatCash, parsePlaceHolderUrl } from '~/utils/formatter'
import { debounceEvent } from '~/utils/helpers'
import { FaSearchIcon } from '~/utils/icons'
import Loading from '../Loading'
import NoProductsAvailable from '../NoProductsAvailable'
import noImage from '~/assets/no-image.png'
import Button from '../Button'

function Search() {
  const [searchedProducts, setSearchedProducts] = useState([])
  const [focus, setFocus] = useState(false)
  const [changed, setChanged] = useState(false)
  const [loading, setLoading] = useState(false)

  const containerRef = useRef()
  const inputRef = useRef()
  const loadingRef = useRef()

  const navigate = useNavigate()

  useOutsideClick(containerRef, () => {
    setFocus(false)
  })

  const handleInputFocus = useCallback(() => {
    setFocus(true)
  }, [])

  useEffect(() => {
    loadingRef.current?.resize('25px')
  })

  const handleInputChange = useCallback(async () => {
    const value = inputRef.current.value
    if (value) {
      try {
        setLoading(true)
        const { products } = await searchProducts({ q: inputRef.current.value })
        setSearchedProducts(products)
        setChanged(true)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    } else {
      setSearchedProducts([])
      setChanged(false)
    }
  }, [])

  const handleItemLinkClick = useCallback(() => {
    setFocus(false)
    inputRef.current.value = ''
    setSearchedProducts([])
  }, [])

  const handleButtonClick = useCallback(() => {
    navigate(`${routesConfig.search}?q=${inputRef.current.value}`)
  }, [navigate])

  return (
    <div
      className={clsx(
        'relative p-[3px] bg-white text-black rounded-full'
      )}
      ref={containerRef}
    >
      <div className='flex items-center '>
        <input
          type='text'
          ref={inputRef}
          className='h-[36px] px-4 flex-1 text-[16px] focus:outline-none rounded-full'
          onFocus={handleInputFocus}
          onChange={debounceEvent(handleInputChange, 500)}
        />
        {loading && (
          <div className='pr-4'>
            <Loading ref={loadingRef} />
          </div>
        )}
        <button
          className='cursor-pointer rounded-full text-white bg-primary-400 hover:bg-primary-200
            p-[10px] flex justify-center items-center transition-all duration-100 ease-in-out'
          onClick={handleButtonClick}
        >
          <FaSearchIcon className='icon !text-base' />
        </button>
      </div>
      <div
        className={clsx(
          'bg-white fixed top-[60px] z-[1000] w-[calc(100vw-30px)] left-1/2 -translate-x-1/2 lg:absolute lg:top-[calc(100%+8px)] lg:w-auto lg:left-0 lg:right-0 lg:translate-x-0 shadow-card rounded-md overflow-hidden',
          {
            hidden: !focus
          }
        )}
      >
        {changed && !searchedProducts.length && (
          <div className='h-[100px] p-[20px] flex justify-center items-center'>
            <NoProductsAvailable imageClassName='h-full' labelClassName='text-[16px]' />
          </div>
        )}
        {!!searchedProducts?.length && (
          <div className='p-[10px] font-medium text-gray-700'>
            {searchedProducts.length} products found
          </div>
        )}
        <ul>
          {searchedProducts.slice(0, 5).map((product, index) => (
            <li key={index}>
              <Link
                to={parsePlaceHolderUrl(routesConfig.productDetails, { slug: product.slug })}
                className='flex items-center p-[10px] hover:bg-[#ECECEC] transition-all duration-100 ease-in-out'
                onClick={handleItemLinkClick}
              >
                <img
                  src={product?.thumb?.url || noImage}
                  className='w-[60px] h-[60px] object-contain'
                />
                <div className='ml-2'>
                  <p className='line-clamp-1 font-semibold'>{product.title}</p>
                  <div className='mt-[6px] flex items-center flex-wrap gap-1'>
                    <span className='font-medium text-primary-400'>{formatCash(product.price)}</span>
                    {product.oldPrice && (
                      <span className='md:ml-3 text-[12px] text-gray-500 line-through font-medium'>
                        {formatCash(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {!!searchedProducts.length > 5 && (
          <div className='border-t p-[10px] flex justify-center'>
            <Link to={`${routesConfig.search}?q=${inputRef.current.value}`}>
              <Button primary rounded>See more</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Search)
