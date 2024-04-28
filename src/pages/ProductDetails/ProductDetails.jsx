import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import ReactImageMagnify from 'react-image-magnify'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { Button, QuantityField, Rating } from '~/components'
import { getProductBySlug } from '~/services/productService'
import { formatCash } from '~/utils/formatter'
import Variants from './Variants'
import { FaCartPlusIcon, FaCartShoppingIcon } from '~/utils/icons'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  // autoplay: true,
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

function ProductDetails() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [variant, setVariant] = useState(null)
  const [currentThumb, setCurrentThumb] = useState(null)
  const quantityFieldRef = useRef(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductBySlug(slug)
      setProduct(product)
      setVariant(product.variants[0])
      setCurrentThumb(product.thumb)
    }
    fetchProduct()
  }, [slug])

  const handleClickThumbItem = (e) => {
    setCurrentThumb(e.target.src)
  }

  const handleSelectVariant = (variant) => {
    setVariant(variant)
  }

  const handleAddToCart = () => {
    console.log(quantityFieldRef.current.getValue())
  }

  return (
    <>
      <div className='container'>
        <div className='grid grid-cols-2 gap-11'>
          <div>
            <div className='border'>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    src: currentThumb,
                    isFluidWidth: true
                  },
                  largeImage: {
                    src: currentThumb,
                    width: 1200,
                    height: 1200
                  },
                  imageClassName: 'object-contain !h-[460px]'
                }}
              />
            </div>
            <div className='mt-6 border'>
              <Slider {...settings}>
                {variant?.images?.map((image, index) => (
                  <img
                    key={index}
                    onClick={handleClickThumbItem}
                    src={image}
                    className='border w-full h-[136px] object-contain p-1 cursor-pointer'
                  />
                ))}
              </Slider>
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-semibold'>{product?.title}</h2>
            <div className='mt-2 flex items-center gap-4'>
              <Rating size='14px' averageRatings={product?.averageRatings} />
              <span className='text-[14px]'>
                {product?.sold} Sold
              </span>
            </div>
            <div className='mt-5 flex items-center'>
              {product?.price ? (
                <span className='mr-3 text-xl text-gray-500 line-through'>
                  {formatCash(product?.price)}
                </span>
              ) : (
                ''
              )}
              <span className='text-3xl font-medium'>
                {formatCash(product?.price)}
              </span>
            </div>
            <div className='mt-7 flex items-center gap-6'>
              <span className='text-sm font-medium text-gray-600'>
                Variants
              </span>
              <Variants
                variants={product?.variants}
                onSelect={handleSelectVariant}
              />
            </div>
            <div className='mt-7 flex items-center gap-6 w-fit'>
              <span className='text-sm font-medium text-gray-600'>
                Quantity
              </span>
              <div className='flex items-center gap-4'>
                <QuantityField max={variant?.quantity} ref={quantityFieldRef} />
                <span className='text-sm text-gray-600'>{variant?.quantity} products available</span>
              </div>
            </div>
            <div className='mt-7 flex gap-4'>
              <Button icon={<FaCartPlusIcon />} primary outlined rounded onClick={handleAddToCart}>
                Add To Cart
              </Button>
              <Button primary rounded>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Helmet>
        <title>{product?.title}</title>
      </Helmet>
    </>
  )
}

export default ProductDetails
