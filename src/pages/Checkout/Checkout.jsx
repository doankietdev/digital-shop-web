import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import noImage from '~/assets/no-image.png'
import {
  Button,
  Card,
  DocumentTitle,
  Mark,
  Modal,
  PayPalPayment,
  SelectorOutlined
} from '~/components'
import { routesConfig } from '~/config'
import { getCart } from '~/pages/Cart/CartSlice'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import { order, reviewOrder } from '~/services/checkoutService'
import { PaymentMethodsEnum } from '~/utils/constants'
import { convertObjectToArrayValues, formatCash } from '~/utils/formatter'
import { LocationDotIcon } from '~/utils/icons'
import AddNewAddress from './AddNewAddress'
import ChangeAddress from './ChangeAddress'
import UpdateAddress from './UpdateAddress'

function Checkout() {
  const [paymentInfo, setPaymentInfo] = useState({
    shippingFee: 0,
    totalPriceApplyDiscount: 0,
    totalPayment: 0,
    countProducts: 0
  })
  const [orderProducts, setOrderProducts] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethodsEnum.ONLINE_PAYMENT.value
  )

  const [openModal, setOpenModal] = useState(false)
  const [openChangeAddress, setOpenChangeAddress] = useState(false)
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false)
  const [addressIdToUpdate, setAddressIdToUpdate] = useState(null)

  const navigate = useNavigate()

  const {
    current: { firstName, lastName, mobile, defaultAddress }
  } = useSelector(userSelector)

  const location = useLocation()

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        if (!location.state?.orderProducts?.length) {
          navigate(routesConfig.cart)
        }
        const {
          orderProducts,
          shippingFee,
          totalPriceApplyDiscount,
          totalPayment
        } = await reviewOrder(location.state?.orderProducts)
        setOrderProducts(orderProducts)
        setPaymentInfo((prevPaymentInfo) => ({
          ...prevPaymentInfo,
          shippingFee,
          totalPriceApplyDiscount,
          totalPayment,
          countProducts: orderProducts.length
        }))
      } catch (error) {
        // navigate to cart
      }
    }
    fetchPaymentInfo()
  }, [
    location.state?.orderProducts,
    location.state?.orderProducts?.length,
    defaultAddress,
    navigate
  ])

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

  const handleSelectPaymentMethod = useCallback((value) => {
    setSelectedPaymentMethod(value)
  }, [])

  const handleOrderClick = useCallback(async () => {
    const loadingToast = toast.loading('Ordering')
    try {
      await order(location.state?.orderProducts, selectedPaymentMethod)
      await dispatch(getCart()).unwrap()
      navigate(routesConfig.cart)
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      toast.dismiss(loadingToast)
    }
  }, [orderProducts, selectedPaymentMethod])

  return (
    <>
      <DocumentTitle title="Checkout" />
      <div className="container">
        <div className="flex flex-col gap-8">
          <Card className="flex flex-col gap-3 shadow-card-md p-6">
            <p className="md:text-[18px] text-primary-400 font-medium">
              <LocationDotIcon className="inline-block mr-1.5" />
              Shipping Address
            </p>
            <div className="flex flex-col md:flex-row gap-3 text-[14px] md:text-[16px]">
              <div className="flex md:items-center gap-2 md:gap-6 flex-col md:flex-row">
                <span className="font-semibold">{`${firstName} ${lastName}`}</span>
                <span className="font-semibold">{mobile}</span>
                <span
                  className={clsx({
                    'text-red-600': !defaultAddress
                  })}
                >
                  {defaultAddress
                    ? `${
                        defaultAddress.streetAddress
                          ? defaultAddress.streetAddress + ', '
                          : ''
                      }
                    ${defaultAddress.ward.name},
                    ${defaultAddress.district.name},
                    ${defaultAddress.province.name}`
                    : 'There is no shipping address yet'}
                </span>
                {defaultAddress && (
                  <div>
                    <Mark>Default</Mark>
                  </div>
                )}
              </div>
              {defaultAddress ? (
                <button
                  className="md:ml-9 text-[14px] text-purple-500"
                  onClick={handleChangeAddressClick}
                >
                  Change address
                </button>
              ) : (
                <button
                  className="md:ml-9 text-[14px] text-purple-500"
                  onClick={handleChangeAddressClick}
                >
                  Add address
                </button>
              )}
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="hidden md:flex md:flex-col p-6">
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
                  <div key={index}>
                    <Card className="p-6 hidden md:flex flex-col overflow-visible">
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
                        <div className="basis-1/6 text-[14px] text-center text-primary-400">
                          {formatCash(totalPriceApplyDiscount)}
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 flex md:hidden flex-col overflow-visible">
                      <div className="flex gap-1">
                        <img
                          src={variant?.images[0] || product.thumb || noImage}
                          className="w-[80px] h-[80px] object-contain"
                        />
                        <div className="flex-1 flex flex-col gap-[6px]">
                          <p className="font-medium line-clamp-2">
                            {product?.title}
                          </p>
                          <p>Variant: {variant?.name}</p>
                          <div>
                            {product?.oldPrice && (
                              <p className="text-gray-500 line-through">
                                {formatCash(product?.oldPrice)}
                              </p>
                            )}
                            <p className="flex justify-between">
                              {formatCash(product?.price)}
                              <span className="">x {quantity}</span>
                            </p>
                          </div>
                          <div className="text-primary-400 text-[16px] font-medium">
                            {formatCash(totalPriceApplyDiscount)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              }
            )}
          </div>

          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 pb-6 border-b">
              <h3 className="md:text-[18px] text-primary-400 font-medium">
                Payment methods
              </h3>
              <div className="flex items-center gap-5 w-[200px]">
                <SelectorOutlined
                  items={convertObjectToArrayValues(PaymentMethodsEnum).map(
                    (paymentMethod) => ({
                      id: paymentMethod.value,
                      name: paymentMethod.name
                    })
                  )}
                  defaultId={PaymentMethodsEnum.ONLINE_PAYMENT.value}
                  onSelect={handleSelectPaymentMethod}
                />
              </div>
            </div>
            <div className="md:flex md:items-center md:justify-end py-6 border-b">
              <table className="w-full md:w-auto text-[14px] md:text-[16px]">
                <tbody>
                  <tr>
                    <td className="pr-2 md:pr-10 font-medium">Total Price</td>
                    <td className="text-end">
                      {formatCash(paymentInfo?.totalPriceApplyDiscount)}
                    </td>
                  </tr>
                  {selectedPaymentMethod !==
                    PaymentMethodsEnum.PAY_IN_STORE.value && (
                    <tr>
                      <td className="pr-2 md:pr-10 font-medium">
                        Shipping Fee
                      </td>
                      <td className="text-end">
                        {formatCash(paymentInfo?.shippingFee)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="pr-2 md:pr-10 font-medium">Total Payment</td>
                    <td className="text-[18px] font-medium text-primary-400 text-end">
                      {formatCash(paymentInfo?.totalPayment)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="md:flex md:items-center md:justify-end w-full pt-6">
              {selectedPaymentMethod ===
                PaymentMethodsEnum.ONLINE_PAYMENT.value ||
              selectedPaymentMethod ===
                PaymentMethodsEnum.CASH_ON_DELIVERY.value ? (
                <div className="w-full md:w-[200px]">
                  <PayPalPayment
                    orderProducts={location.state?.orderProducts}
                  />
                </div>
              ) : (
                <Button
                  primary
                  rounded
                  disabled={
                    !defaultAddress &&
                    selectedPaymentMethod !== PaymentMethodsEnum.PAY_IN_STORE_ID
                  }
                  onClick={handleOrderClick}
                  className="w-full md:w-[200px]"
                >
                  Order
                </Button>
              )}
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
