import clsx from 'clsx'
import lodash from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import { setLoading } from '~/AppSlice'
import {
  Button,
  Card,
  DocumentTitle,
  GlobalLoading,
  ImageMagnifier,
  Product,
  QuantityField,
  Rating
} from '~/components'
import { routesConfig } from '~/config'
import { ReactSlickArrow } from '~/customLibraries/components'
import { addToCart } from '~/pages/Cart/CartSlice'
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
  infinite: false,
  speed: 500,
  autoplay: true,
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
  const [productImages, setProductImages] = useState([])
  const [similarProducts, setSimilarProducts] = useState([])
  const [variant, setVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [hasError, setHasError] = useState(false)
  const [productImageIndex, setProductImageIndex] = useState(0)
  const { loading } = useSelector(appSelector)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(setLoading(true))
      const product = await getProductBySlug(slug)
      if (!product) return

      setProductImages(() => {
        const variantImages = lodash.flattenDeep(product?.variants?.map(variant => variant?.images))
        return [
          product.thumb.url,
          ...variantImages
        ]
      })

      const similarProducts = (
        await getProducts({
          category: product?.category._id,
          _sort: '-createdAt',
          _limit: 50
        })
      ).products
      setProduct(product)
      setSimilarProducts(similarProducts)
      dispatch(setLoading(false))
    }
    fetchProduct()
  }, [slug])

  const handleClickImageItem = useCallback((index) => {
    setProductImageIndex(index)
  }, [])

  const handleSelectVariant = useCallback((variant) => {
    setHasError(false)
    setVariant(variant)
    setProductImages(variant.images)
  }, [])

  const handleQuantityFieldChange = useCallback(value => {
    setQuantity(value.quantity)
  }, [])

  const handleAddToCart = useCallback(async () => {
    if (!variant) {
      return setHasError(true)
    }
    const loadingToast = toast.loading('Adding product to cart...')
    try {
      await dispatch(
        addToCart({ productId: product?._id, variantId: variant._id, quantity })
      ).unwrap()
      toast.success('Product has been added to cart')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      toast.dismiss(loadingToast)
    }
  }, [product?._id, quantity, variant])

  const handleBuyNowClick = useCallback(() => {
    if (!variant) {
      return setHasError(true)
    }
    const orderProductsString = encodeURIComponent(JSON.stringify([{
      productId: product?._id,
      variantId: variant?._id,
      oldPrice: product?.oldPrice,
      price: product?.price,
      quantity: quantity
    }]))
    navigate(`${routesConfig.checkout}?state=${orderProductsString}`)
  }, [navigate, product?._id, product?.oldPrice, product?.price, quantity, variant])

  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <>
          <DocumentTitle title={product?.title} />
          <div className="container flex flex-col gap-7">
            <Card className="p-[16px] md:p-[24px] md:grid md:grid-cols-2 md:gap-11 bg-white">
              <div>
                <ImageMagnifier
                  src={productImages[productImageIndex]}
                  mirrorSize='200px'
                />
                {productImages.length >= 2 && (
                  <div className="mt-6 mx-[-10px]">
                    <Slider {...imageSliderSettings}>
                      {productImages.map((image, index) => (
                        <div key={index} className="bg-white !w-auto mx-[10px]">
                          <img
                            onClick={() => handleClickImageItem(index)}
                            src={image}
                            className="h-[140px] object-contain cursor-pointer rounded"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>
              <div className="mt-4 md:mt-0">
                <h1 className="text-[20px] md:text-[24px] font-semibold line-clamp-2">
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
                      <span className="text-[12px] md:text-[14px] text-gray-600">
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
                  <Button primary rounded onClick={handleBuyNowClick}>
                    Buy Now
                  </Button>
                </div>
              </div>
            </Card>
            <Card className="p-[16px] md:p-[24px] bg-white flex flex-col gap-5">
              <div>
                <h2 className="text[16px] md:text-[18px] font-medium uppercase
                  bg-[#f7f7f7] p-[12px] md:p-[14px]"
                >
                  Specifications
                </h2>
                <div className='mt-[8px] px-[12px] md:px-[14px]'>
                  <table className="w-full ">
                    <tbody>
                      {product?.specs?.map((spec, index) => (
                        <tr key={index} className="flex">
                          <td className="pr-[6px] w-[120px] md:w-[152px] text-[14px] text-[#00000066]">
                            {spec.k}
                          </td>
                          <td className="p-[6px] flex-1 text-[14px]">{spec.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {product?.description && (
                <div>
                  <h2 className="text[16px] md:text-[18px] font-medium uppercase bg-[#f7f7f7] p-3 md:p-[14px]">
                  Description
                  </h2>
                  <p className="mt-[8px]">{product?.description}</p>
                </div>
              )}
            </Card>
            <div>
              <h2 className="uppercase font-semibold text-[18px] md:text-[20px] border-b-2 border-primary-400 pb-2">
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
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails
