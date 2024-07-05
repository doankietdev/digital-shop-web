import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import noImage from '~/assets/no-image.png'
import {
  AddNewAddress,
  Button,
  Card,
  ChangeAddress,
  DocumentTitle,
  Mark,
  Modal,
  PayPalPayment,
  SelectorOutlined,
  UpdateAddress,
  ModalLoading
} from '~/components'
import { routesConfig } from '~/config'
import { getCart } from '~/pages/Cart/CartSlice'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import { order, reviewOrder } from '~/services/checkoutService'
import { PaymentMethodsEnum } from '~/utils/constants'
import { convertObjectToArrayValues, formatCash } from '~/utils/formatter'
import { LocationDotIcon } from '~/utils/icons'

function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()

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
  const [orderLoading, setOrderLoading] = useState(false)
  const [globalLoading, setGlobalLoading] = useState(false)

  const orderProductsFromCartPage = useMemo(() => {
    const query = new URLSearchParams(location.search)
    const orderProductsString = query.get('state')
    if (!orderProductsString) {
      navigate(routesConfig.cart)
    }
    return JSON.parse(decodeURIComponent(orderProductsString))
  }, [location.search, navigate])

  const {
    current: { firstName, lastName, mobile, defaultAddress }
  } = useSelector(userSelector)

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        setGlobalLoading(true)
        const {
          orderProducts,
          shippingFee,
          totalPriceApplyDiscount,
          totalPayment
        } = await reviewOrder(orderProductsFromCartPage)
        setOrderProducts(orderProducts)
        setPaymentInfo((prevPaymentInfo) => ({
          ...prevPaymentInfo,
          shippingFee,
          totalPriceApplyDiscount,
          totalPayment,
          countProducts: orderProducts.length
        }))
      } catch (error) {
        toast.error(error.messages[0])
        navigate(routesConfig.cart)
      } finally {
        setGlobalLoading(false)
      }
    }
    fetchPaymentInfo()
  }, [
    orderProductsFromCartPage,
    orderProductsFromCartPage?.length,
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
      setOrderLoading(true)
      await order(orderProductsFromCartPage, selectedPaymentMethod)
      await dispatch(getCart()).unwrap()
      navigate(routesConfig.orders)
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setOrderLoading(false)
      toast.dismiss(loadingToast)
    }
  }, [navigate, orderProductsFromCartPage, selectedPaymentMethod])

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
            <div className="flex flex-col lg:flex-row gap-6 text-[14px] md:text-[18px] lg:text-[16px]">
              <div className="flex lg:items-center gap-2 lg:gap-6 flex-col lg:flex-row">
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
                <>
                  <button
                    className="hidden lg:block lg:ml-9 text-[14px] text-blue-500 hover:text-red-500"
                    onClick={handleChangeAddressClick}
                  >
                    Change address
                  </button>
                  <Button
                    className="block lg:hidden"
                    primary
                    rounded
                    outlined
                    onClick={handleChangeAddressClick}
                  >
                    Change address
                  </Button>
                </>
              ) : (
                <>
                  <button
                    className="hidden lg:block lg:ml-9 text-[14px] text-blue-500 hover:text-red-500"
                    onClick={handleChangeAddressClick}
                  >
                    Add address
                  </button>
                  <Button
                    className="block lg:hidden"
                    primary
                    rounded
                    outlined
                    onClick={handleChangeAddressClick}
                  >
                    Add address
                  </Button>
                </>
              )}
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="hidden md:flex md:flex-col p-6">
              <div className="flex items-center gap-1 font-semibold">
                <div className="basis-2/6">Product</div>
                <div className="basis-1/6 text-center">Variant</div>
                <div className="basis-1/6 text-center">Unit Price</div>
                <div className="basis-1/6 text-center">Quantity</div>
                <div className="basis-1/6 text-center">Total Price</div>
              </div>
            </Card>
            {orderProducts.map(
              ({ product, quantity, totalPriceApplyDiscount }, index) => {
                const variant = product?.variant
                return (
                  <div key={index}>
                    <Card className="p-6 hidden md:flex flex-col overflow-visible">
                      <div className="flex items-center gap-1">
                        <div className="basis-2/6 flex items-center gap-3">
                          <img
                            src={variant?.images[0] || product.thumb || noImage}
                            className="w-[80px] h-[80px] object-contain"
                          />
                          <p className="line-clamp-2">{product?.title}</p>
                        </div>
                        <div className="basis-1/6 flex justify-center items-center">
                          <p>{variant?.name}</p>
                        </div>
                        <div className="basis-1/6 text-center">
                          {product?.oldPrice && (
                            <p className=" text-gray-500 line-through">
                              {formatCash(product?.oldPrice)}
                            </p>
                          )}
                          <p>{formatCash(product?.price)}</p>
                        </div>
                        <div className="basis-1/6 text-center">{quantity}</div>
                        <div className="basis-1/6 text-center text-primary-400">
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
                  disabled={orderLoading}
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
            <div className="lg:flex lg:items-center lg:justify-end w-full pt-6">
              {selectedPaymentMethod ===
                PaymentMethodsEnum.ONLINE_PAYMENT.value ||
              selectedPaymentMethod ===
                PaymentMethodsEnum.CASH_ON_DELIVERY.value ? (
                  <div className="w-full lg:w-[200px]">
                    <PayPalPayment orderProducts={orderProductsFromCartPage} />
                  </div>
                ) : (
                  <Button
                    primary
                    rounded
                    disabled={
                      (!defaultAddress &&
                      selectedPaymentMethod !==
                        PaymentMethodsEnum.PAY_IN_STORE) ||
                    orderLoading
                    }
                    onClick={handleOrderClick}
                    className="w-full lg:w-[200px]"
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

      {globalLoading && (
        <ModalLoading />
      )}
    </>
  )
}

export default Checkout
