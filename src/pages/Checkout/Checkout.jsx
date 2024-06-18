import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import noImage from '~/assets/no-image.png'
import { Button, Card, DocumentTitle, Mark, Modal } from '~/components'
import { reviewOrder } from '~/services/checkoutService'
import { formatCash } from '~/utils/formatter'
import { LocationDotIcon } from '~/utils/icons'
import AddNewAddress from './AddNewAddress'
import ChangeAddress from './ChangeAddress'
import { useSelector } from 'react-redux'
import { userSelector } from '~/redux/selectors'
import UpdateAddress from './UpdateAddress'

function Checkout() {
  const [paymentInfo, setPaymentInfo] = useState({
    totalPriceApplyDiscount: 0,
    totalPrice: 0,
    countProducts: 0
  })
  const [orderProducts, setOrderProducts] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [openChangeAddress, setOpenChangeAddress] = useState(false)
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false)
  const [addressIdToUpdate, setAddressIdToUpdate] = useState(null)

  const {
    current: { defaultAddress }
  } = useSelector(userSelector)

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
    setOpenModal(true)
    setOpenChangeAddress(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
    setOpenChangeAddress(false)
    setOpenAddAddress(false)
  }, [])

  const handleAddNewAddressClick = useCallback(() => {
    setOpenChangeAddress(false)
    setOpenAddAddress(true)
  }, [])

  const handleCloseAddAddress = useCallback(() => {
    setOpenAddAddress(false)
    setOpenChangeAddress(true)
  }, [])

  const handleUpdateAddress = useCallback((addressId) => {
    setAddressIdToUpdate(addressId)
    setOpenUpdateAddress(true)
    setOpenChangeAddress(false)
  }, [])

  const handleCloseUpdateAddress = useCallback(() => {
    setAddressIdToUpdate(null)
    setOpenUpdateAddress(false)
    setOpenChangeAddress(true)
  }, [])

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
                <span>
                  {`${
                    defaultAddress.streetAddress
                      ? defaultAddress.streetAddress + ', '
                      : ''
                  }
                  ${defaultAddress.ward.name},
                  ${defaultAddress.district.name},
                  ${defaultAddress.province.name}`}
                </span>
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

      {openModal && (
        <Modal onClose={handleCloseModal}>
          {openChangeAddress && (
            <ChangeAddress
              handleCloseModal={handleCloseModal}
              onAddNewAddress={handleAddNewAddressClick}
              onUpdateAddress={handleUpdateAddress}
            />
          )}

          {openAddAddress && <AddNewAddress onClose={handleCloseAddAddress} />}
          {openUpdateAddress && (
            <UpdateAddress
              addressId={addressIdToUpdate}
              onClose={handleCloseUpdateAddress}
            />
          )}
        </Modal>
      )}
    </>
  )
}

export default Checkout
