import { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import noImage from '~/assets/no-image.png'
import { Card, Checkbox, DocumentTitle, QuantityField } from '~/components'
import { dispatch } from '~/redux'
import { cartSelector } from '~/redux/selectors'
import { formatCash } from '~/utils/formatter'
import { updateVariant } from './CartSlice'
import UpdateVariant from './UpdateVariant'

function Cart() {
  const updateVariantRef = useRef()
  const { products } = useSelector(cartSelector)

  const handleQuantityFieldChange = useCallback(() => {
  }, [])

  const handleUpdateVariant = useCallback(
    async ({ productId, oldVariantId, variantId }) => {
      toast.promise(
        dispatch(
          updateVariant({ productId, oldVariantId, variantId })
        ).unwrap(),
        {
          pending: {
            render() {
              return 'Updating variant'
            }
          },
          success: {
            render() {
              return 'Update variant successfully'
            }
          },
          error: {
            render({ data }) {
              updateVariantRef.current.rollback()
              return data.messages[0]
            }
          }
        }
      )
    },
    []
  )

  return (
    <>
      <DocumentTitle title="Cart" />
      <div className="container">
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3">
            <div className="flex items-center gap-1 font-semibold">
              <div className="mr-4">
                <Checkbox id="checkbox" />
              </div>
              <div className="basis-4/12 text-[14px]">Product</div>
              <div className="basis-2/12 text-[14px] text-center">Variant</div>
              <div className="basis-[12.5%] text-[14px] text-center">
                Unit Price
              </div>
              <div className="basis-[12.5%] text-[14px] text-center">
                Quantity
              </div>
              <div className="basis-[12.5%] text-[14px] text-center">
                Total Price
              </div>
              <div className="basis-[12.5%] text-[14px] text-center">
                Action
              </div>
            </div>
          </Card>

          {products.map(({ product, variantId, quantity }, index) => {
            const variant = product.variants.find(
              (variant) => variant._id === variantId
            )
            return (
              <Card
                key={index}
                className="flex flex-col gap-3 overflow-visible"
              >
                <div className="flex items-center gap-1">
                  <div className="mr-4">
                    <Checkbox id="checkbox" />
                  </div>
                  <div className="basis-4/12 text-[14px] flex items-center gap-3">
                    <img
                      src={variant.images[0] || noImage}
                      className="w-[80px] h-[80px] object-contain"
                    />
                    <span className="text-[14px] line-clamp-2">
                      {product.title}
                    </span>
                  </div>
                  <div className="basis-2/12 text-[14px] flex justify-center items-center">
                    <UpdateVariant
                      title={variant.name}
                      variants={product?.variants}
                      defaultVariantId={variant._id}
                      onChange={(value) =>
                        handleUpdateVariant({
                          productId: product._id,
                          oldVariantId: variant._id,
                          variantId: value
                        })
                      }
                      ref={updateVariantRef}
                    />
                  </div>
                  <div className="basis-[12.5%] text-[14px] flex flex-wrap justify-center items-center">
                    {product?.oldPrice ? (
                      <span className="mr-2 text-[14px] text-gray-500 line-through">
                        {formatCash(product?.oldPrice)}
                      </span>
                    ) : (
                      ''
                    )}
                    <span className="text-[14px]">
                      {formatCash(product?.price)}
                    </span>
                  </div>
                  <div className="basis-[12.5%] text-[14px] flex justify-center items-center">
                    <QuantityField
                      defaultValue={quantity}
                      max={variant ? variant?.quantity : product?.quantity}
                      onChange={handleQuantityFieldChange}
                    />
                  </div>
                  <div className="basis-[12.5%] text-[14px] flex justify-center items-center">
                    {formatCash(product?.price * quantity)}
                  </div>
                  <div className="basis-[12.5%] text-[14px] flex justify-center items-center">
                    Action
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Cart
