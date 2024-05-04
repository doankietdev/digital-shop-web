import { useEffect, useRef, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { setLoading } from '~/AppSlice'
import {
  Button,
  Card,
  DocumentTitle,
  GlobalLoading,
  Product,
  QuantityField,
  Rating
} from '~/components'
import { ReactSlickArrow } from '~/customLibraries/components'
import { dispatch } from '~/redux'
import { appSelector } from '~/redux/selectors'
import { getProductBySlug, getProducts } from '~/services/productService'
import { formatCash } from '~/utils/formatter'
import {
  FaCartPlusIcon,
  MdArrowBackIosNewIcon,
  MdArrowForwardIosIcon
} from '~/utils/icons'
import Variants from './Variants'

const imageSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: (
    <ReactSlickArrow>
      <MdArrowBackIosNewIcon />
    </ReactSlickArrow>
  ),
  nextArrow: (
    <ReactSlickArrow>
      <MdArrowForwardIosIcon />
    </ReactSlickArrow>
  ),
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
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
}

const similarProductSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
  slidesToScroll: 1,
  adaptiveHeight: true,
  prevArrow: (
    <ReactSlickArrow>
      <MdArrowBackIosNewIcon />
    </ReactSlickArrow>
  ),
  nextArrow: (
    <ReactSlickArrow>
      <MdArrowForwardIosIcon />
    </ReactSlickArrow>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
}

function ProductDetails() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [variant, setVariant] = useState(null)
  const [currentThumb, setCurrentThumb] = useState(null)
  const quantityFieldRef = useRef(null)
  const { loading } = useSelector(appSelector)
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(setLoading(true))
      const product = await getProductBySlug(slug)
      if (!product) return

      const similarProducts = (
        await getProducts({
          category: product?.category,
          _sort: '-createdAt',
          _limit: 50
        })
      ).products
      setProduct(product)
      setVariant(product.variants[0])
      setCurrentThumb(product.thumb.url)
      setSimilarProducts(similarProducts)
      dispatch(setLoading(false))
    }
    fetchProduct()
  }, [slug])

  const handleClickThumbItem = (e) => {
    setCurrentThumb(e.target.src)
  }

  const handleSelectVariant = (variant) => {
    setVariant(variant)
  }

  const handleAddToCart = () => {}

  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <>
          <DocumentTitle title={product?.title} />
          <div className='container'>
            <section className='md:grid md:grid-rows-2 md:grid-cols-2 md:gap-11'>
              <div>
                <div className='rounded'>
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
                      imageClassName: 'object-cover !h-[460px]'
                    }}
                  />
                </div>
                <div className='mt-6 mx-[-10px]'>
                  <Slider {...imageSliderSettings}>
                    {variant?.images?.map((image, index) => (
                      <div key={index} className='bg-white !w-auto mx-[10px]'>
                        <img
                          onClick={handleClickThumbItem}
                          src={image}
                          className='w-full object-contain cursor-pointer rounded'
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className='mt-4 md:mt-0'>
                <h1 className='text-xl md:text-2xl font-semibold'>
                  {product?.title}
                </h1>
                <div className='mt-2 flex items-center gap-4'>
                  <Rating
                    size='14px'
                    averageRatings={product?.averageRatings}
                  />
                  <span className='text-[14px]'>{product?.sold} Sold</span>
                </div>
                <div className='mt-5 flex lg:items-center md:flex-col md:gap-1 flex-wrap'>
                  {product?.price ? (
                    <span className='mr-3 text-lg text-gray-500 line-through'>
                      {formatCash(product?.price)}
                    </span>
                  ) : (
                    ''
                  )}
                  <span className='text-xl font-medium'>
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
                    <QuantityField
                      max={variant?.quantity}
                      ref={quantityFieldRef}
                    />
                    <span className='text-sm text-gray-600'>
                      {variant?.quantity} products available
                    </span>
                  </div>
                </div>
                <div className='mt-8 flex flex-col-reverse md:flex-row gap-4'>
                  <Button
                    icon={<FaCartPlusIcon />}
                    primary
                    outlined
                    rounded
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </Button>
                  <Button primary rounded>
                    Buy Now
                  </Button>
                </div>
              </div>
            </section>
            <section className='grid xl:grid-cols-3 gap-8 xl:gap-6 mt-7'>
              <Card className='xl:col-span-2 order-2 xl:order-none'>
                <h2 className='text-center uppercase text-lg font-semibold'>
                  Highlights
                </h2>
                <p className='mt-2'>{product?.description}</p>
              </Card>
              <Card className='xl:col-span-1 order-1 xl:order-none'>
                <h2 className='font-semibold uppercase'>Specifications</h2>
                <table className='w-full mt-2 text-sm'>
                  <tbody>
                    {product?.specs?.map((spec) => (
                      <>
                        <tr className='flex'>
                          <td className='p-2 bg-[#f7f7f7] border w-[152px] font-semibold'>
                            {spec.k}
                          </td>
                          <td className='p-2 border flex-1'>{spec.v}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
            <section className='mt-7'>
              <h2 className='uppercase font-semibold text-xl border-b-2 border-primary-400 pb-2'>
                Similar Products
              </h2>
              <div className='mt-5 -mx-[10px]'>
                <Slider {...similarProductSliderSettings}>
                  {similarProducts.map((product) => (
                    <Product
                      key={product._id}
                      product={product}
                      showLabel
                      autoLabel
                    />
                  ))}
                </Slider>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails
