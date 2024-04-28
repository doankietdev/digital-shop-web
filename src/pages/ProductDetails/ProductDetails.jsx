import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import ReactImageMagnify from 'react-image-magnify'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { Rating } from '~/components'
import { getProductBySlug } from '~/services/productService'
import { formatCash } from '~/utils/formatter'

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

  return (
    <>
      <div className='container'>
        <div className='mt-9 grid grid-cols-3'>
          <div className='col-span-1'>
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
          <div className='col-span-2'>
            <h2 className='text-2xl font-medium'>{product?.title}</h2>
            <div className='mt-[10px] flex items-center'>
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
            <div className='flex items-center gap-4'>
              <Rating size='16px' averageRatings={product?.averageRatings} />
              <span className='text-[16px] relative top-[1.3px]'>
                Sold {product?.sold}
              </span>
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
