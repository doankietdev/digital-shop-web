import { useCallback, useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'
import { addToCart } from '~/pages/Cart/CartSlice'
import clsx from 'clsx'

const imageSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  // autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
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
  const [quantity, setQuantity] = useState(1)
  const [hasError, setHasError] = useState(false)
  const [currentThumb, setCurrentThumb] = useState(null)
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
      setCurrentThumb(product.thumb.url)
      setSimilarProducts(similarProducts)
      dispatch(setLoading(false))
    }
    fetchProduct()
  }, [slug])

  const handleClickThumbItem = useCallback((image) => {
    setCurrentThumb(image)
  }, [])

  const handleSelectVariant = useCallback((variant) => {
    setHasError(false)
    setVariant(variant)
  }, [])

  const handleQuantityFieldChange = useCallback(value => {
    setQuantity(value.quantity)
  }, [])

  const handleAddToCart = useCallback(async () => {
    try {
      if (!variant) {
        return setHasError(true)
      }
      setHasError(false)
      await dispatch(
        addToCart({ productId: product?._id, variantId: variant._id, quantity })
      ).unwrap()
      toast.success('Product has been added to cart')
    } catch (error) {
      toast.error(error.messages[0])
    }
  }, [product?._id, quantity, variant])

  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <>
          <DocumentTitle title={product?.title} />
          <div className="container flex flex-col gap-7">
            <Card className="p-[26px] md:grid md:grid-cols-2 md:gap-11 bg-white">
              <div>
                <div className="rounded">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        src: currentThumb || '',
                        isFluidWidth: true
                      },
                      largeImage: {
                        src: currentThumb || '',
                        width: 1200,
                        height: 1200
                      },
                      imageClassName: 'object-contain !h-[460px]'
                    }}
                  />
                </div>
                <div className="mt-6 mx-[-10px]">
                  <Slider {...imageSliderSettings}>
                    {variant?.images?.map((image, index) => (
                      <div key={index} className="bg-white !w-auto mx-[10px]">
                        <img
                          onClick={() => handleClickThumbItem(image)}
                          src={image}
                          className="h-[140px] object-contain cursor-pointer rounded"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <h1 className="text-xl md:text-2xl font-semibold">
                  {product?.title}
                </h1>
                <div className="mt-2 flex items-center gap-4">
                  <Rating
                    size="14px"
                    averageRatings={product?.averageRatings}
                  />
                  <span className="text-[14px]">{product?.sold} Sold</span>
                </div>
                <div className="mt-5 flex items-center gap-1 flex-wrap">
                  {product?.oldPrice ? (
                    <span className="mr-3 text-lg text-gray-500 line-through">
                      {formatCash(product?.oldPrice)}
                    </span>
                  ) : (
                    ''
                  )}
                  <span className="text-xl font-medium">
                    {formatCash(product?.price)}
                  </span>
                </div>
                <div
                  className={clsx('mt-7', {
                    'p-4 -ml-4 bg-red-50': hasError
                  })}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-600">
                      Variants
                    </span>
                    <Variants
                      variants={product?.variants}
                      defaultVariantId={product?.variants[0]?._id}
                      onSelect={handleSelectVariant}
                    />
                  </div>
                  <div className="mt-7 flex items-center gap-6 w-fit">
                    <span className="text-sm font-medium text-gray-600">
                      Quantity
                    </span>
                    <div className="flex items-center gap-4">
                      <QuantityField
                        max={variant ? variant?.quantity : product?.quantity}
                        onChange={handleQuantityFieldChange}
                      />
                      <span className="text-sm text-gray-600">
                        {variant ? variant?.quantity : product?.quantity}{' '}
                        products available
                      </span>
                    </div>
                  </div>
                  <p className={clsx(
                    'text-red-500 text-[14px] mt-4',
                    {
                      'hidden': !hasError
                    }
                  )}>
                    Please select variant
                  </p>
                </div>
                <div className="mt-8 flex flex-col-reverse md:flex-row gap-4">
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
            </Card>
            <Card className="p-[26px] bg-white flex flex-col gap-5">
              <div>
                <h2 className="text[16px] md:text-[18px] font-medium uppercase bg-[#f7f7f7] p-3 md:p-[14px]">
                  Specifications
                </h2>
                <table className="w-full mt-5 mx-3">
                  <tbody>
                    {product?.specs?.map((spec, index) => (
                      <tr key={index} className="flex">
                        <td className="p-[6px] w-[120px] md:w-[152px] text-[14px] text-[#00000066]">
                          {spec.k}
                        </td>
                        <td className="p-[6px] flex-1 text-[14px]">{spec.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text[16px] md:text-[18px] font-medium uppercase bg-[#f7f7f7] p-3 md:p-[14px]">
                  Description
                </h2>
                <p className="mt-2">{product?.description}</p>
              </div>
            </Card>
            <section>
              <h2 className="uppercase font-semibold text-xl border-b-2 border-primary-400 pb-2">
                Similar Products
              </h2>
              <div className="mt-5 -mx-[10px]">
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
