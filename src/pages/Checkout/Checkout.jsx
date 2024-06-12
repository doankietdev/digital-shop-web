import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Card, DocumentTitle, Mark, Modal } from '~/components'
import { reviewOrder } from '~/services/checkoutService'
import { FaPlusIcon, LocationDotIcon } from '~/utils/icons'
import noImage from '~/assets/no-image.png'
import { formatCash } from '~/utils/formatter'

function Checkout() {
  const [paymentInfo, setPaymentInfo] = useState({
    totalPriceApplyDiscount: 0,
    totalPrice: 0,
    countProducts: 0
  })
  const [orderProducts, setOrderProducts] = useState([])
  const [openChangeAddressModal, setOpenChangeAddressModal] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (!location.state?.orderProducts?.length) return
        const { totalPriceApplyDiscount, totalPrice, orderProducts } =
          await reviewOrder(location.state?.orderProducts)
        setOrderProducts(orderProducts)
        setPaymentInfo((prevPaymentInfo) => ({
          ...prevPaymentInfo,
          totalPriceApplyDiscount,
          totalPrice,
          countProducts: orderProducts.length
        }))
      } catch (error) {
        // navigate to cart
      }
    }
    fetchApi()
  }, [location.state?.orderProducts, location.state?.orderProducts?.length])

  const handleChangeAddressClick = useCallback(() => {
    setOpenChangeAddressModal(true)
  }, [])

  const handleCloseChangeAddressModal = useCallback(() => {
    setOpenChangeAddressModal(false)
  }, [])

  // console.log(orderProducts)

  return (
    <>
      <DocumentTitle title="Checkout" />
      <div className="container">
        <div className="flex flex-col gap-8">
          <Card className="flex flex-col gap-3 shadow-card-md p-6">
            <p className="text-[18px] text-primary-400">
              <LocationDotIcon className="inline-block mr-1.5" />
              Receiving Address
            </p>
            <div className="flex">
              <div className="flex items-center gap-6">
                <span className="font-semibold">Đoàn Anh Kiệt</span>
                <span className="font-semibold">0988437477</span>
                <span>Thị Trấn An Phú, Huyện An Phú, An Giang</span>
                <Mark>Default</Mark>
              </div>
              <button
                className="ml-9 text-[14px] text-purple-500"
                onClick={handleChangeAddressClick}
              >
                Change
              </button>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="flex flex-col p-6">
              <div className="flex items-center gap-1 font-semibold">
                <div className="basis-2/6 text-[14px]">Product</div>
                <div className="basis-1/6 text-[14px] text-center">Variant</div>
                <div className="basis-1/6 text-[14px] text-center">
                  Unit Price
                </div>
                <div className="basis-1/6 text-[14px] text-center">
                  Quantity
                </div>
                <div className="basis-1/6 text-[14px] text-center">
                  Total Price
                </div>
              </div>
            </Card>
            {orderProducts.map(
              ({ product, quantity, totalPriceApplyDiscount }, index) => {
                const variant = product?.variant
                return (
                  <Card
                    key={index}
                    className="p-6 flex flex-col overflow-visible"
                  >
                    <div className="flex items-center gap-1">
                      <div className="basis-2/6 text-[14px] flex items-center gap-3">
                        <img
                          src={variant?.images[0] || product.thumb || noImage}
                          className="w-[80px] h-[80px] object-contain"
                        />
                        <p className="text-[14px] line-clamp-2">
                          {product?.title}
                        </p>
                      </div>
                      <div className="basis-1/6 text-[14px] flex justify-center items-center">
                        <p>{variant?.name}</p>
                      </div>
                      <div className="basis-1/6 text-[14px] text-center">
                        {product?.oldPrice && (
                          <p className="text-[14px] text-gray-500 line-through">
                            {formatCash(product?.oldPrice)}
                          </p>
                        )}
                        <p className="text-[14px]">
                          {formatCash(product?.price)}
                        </p>
                      </div>
                      <div className="basis-1/6 text-[14px] text-center">
                        {quantity}
                      </div>
                      <div className="basis-1/6 text-[14px] text-center text-red-600">
                        {formatCash(totalPriceApplyDiscount)}
                      </div>
                    </div>
                  </Card>
                )
              }
            )}
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center pb-6 border-b">
              <h3 className="text-[18px]">Payment methods</h3>
              <div className="flex items-center gap-5">
                <p className="text-[14px]">Payment upon receipt of goods</p>
                <button className="ml-9 text-[14px] text-purple-500">
                  Change
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end py-6 border-b">
              <table>
                <tbody>
                  <tr>
                    <td className="pr-10">Total Price</td>
                    <td className="text-end">
                      {formatCash(paymentInfo.totalPriceApplyDiscount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10">Transport Fee</td>
                    <td className="text-end">
                      {formatCash(paymentInfo.totalPriceApplyDiscount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10">Total Payment</td>
                    <td className="text-[26px] font-medium text-primary-400 text-end">
                      {formatCash(paymentInfo.totalPriceApplyDiscount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end pt-6">
              <Button primary rounded>
                Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        open={openChangeAddressModal}
        onClose={handleCloseChangeAddressModal}
      >
        <div className="w-[500px] h-[600px] flex flex-col">
          <h3 className="pb-6 border-b">My Address</h3>

          {/* Address items */}
          <div className="flex-1 border-b">
            <div className="py-6 flex flex-col gap-4">
              <div className="flex">
                <div className="mr-3">
                  <div className="cursor-pointer w-[18px] h-[18px] rounded-full border-2 border-primary-400 flex justify-center items-center">
                    <div className="w-[6px] h-[6px] rounded-full bg-primary-400"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>Thị Trấn An Phú, Huyện An Phú, An Giang</span>
                    <button
                      className="text-[14px] text-purple-500"
                      // onClick={handle}
                    >
                      Update
                    </button>
                  </div>
                  <Mark>Default</Mark>
                </div>
              </div>

              <div className="flex">
                <div className="mr-3">
                  <div className="cursor-pointer w-[18px] h-[18px] rounded-full border-2 border-primary-400 flex justify-center items-center">
                    <div className="w-[6px] h-[6px] rounded-full bg-primary-400"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>Thị Trấn An Phú, Huyện An Phú, An Giang</span>
                    <button
                      className="text-[14px] text-purple-500"
                      // onClick={handle}
                    >
                      Update
                    </button>
                  </div>
                  <Mark>Default</Mark>
                </div>
              </div>
            </div>

            <Button primary outlined rounded icon={<FaPlusIcon />}>
              Add New Address
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button primary outlined rounded onClick={handleCloseChangeAddressModal}>
              Cancel
            </Button>
            <Button primary rounded>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Checkout
