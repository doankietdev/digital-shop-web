import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AddNewAddress, Button, Card, Divider, DocumentTitle, Modal, ModalLoading, UpdateAddress } from '~/components'
import { userSelector } from '~/redux/selectors'
import orderService from '~/services/orderService'
import { OrderStatusesEnum, PaymentMethodsEnum } from '~/utils/constants'
import { formatCash } from '~/utils/formatter'
import { LocationDotIcon } from '~/utils/icons'
import ChangeShippingAddress from './ChangeShippingAddress'
import { toast } from 'react-toastify'
import { cancelOrder } from '~/services/checkoutService'
import { routesConfig } from '~/config'
import { dispatch } from '~/redux'
import { addProductsToCart } from '../Cart/CartSlice'

function OrderDetails() {
  const params = useParams()
  const [order, setOrder] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openChangeShippingAddress, setOpenChangeShippingAddress] = useState(false)
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false)
  const [addressIdToUpdate, setAddressIdToUpdate] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const {
    current: { firstName, lastName, mobile }
  } = useSelector(userSelector)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setOrder(await orderService.getOrderOfCurrentUser(params.orderId))
      } catch (error) {
        //
      }
    }
    fetchOrder()
  }, [params.orderId])

  const handleChangeShippingAddressClick = useCallback(() => {
    setOpenModal(true)
    setOpenChangeShippingAddress(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
    setOpenChangeShippingAddress(false)
    setOpenAddAddress(false)
  }, [])

  const handleAddNewAddressClick = useCallback(() => {
    setOpenChangeShippingAddress(false)
    setOpenAddAddress(true)
  }, [])

  const handleCloseAddAddress = useCallback(() => {
    setOpenAddAddress(false)
    setOpenChangeShippingAddress(true)
  }, [])

  const handleUpdateAddress = useCallback((addressId) => {
    setAddressIdToUpdate(addressId)
    setOpenUpdateAddress(true)
    setOpenChangeShippingAddress(false)
  }, [])

  const handleCloseUpdateAddress = useCallback(() => {
    setAddressIdToUpdate(null)
    setOpenUpdateAddress(false)
    setOpenChangeShippingAddress(true)
  }, [])

  const handleCancelOrder = useCallback(
    async orderId => {
      const loadingToast = toast.loading('Cancelling order...')
      try {
        setDisabled(true)
        await cancelOrder(orderId)
        toast.success('Cancel order successfully')
        navigate(`${routesConfig.orders}?status=CANCELED`)
      } catch (error) {
        toast.error(error.messages[0])
      } finally {
        setDisabled(false)
        toast.dismiss(loadingToast)
      }
    },
    [navigate]
  )

  const handleRepurchase = useCallback(
    async order => {
      const loadingToast = toast.loading('Repurchasing...')
      try {
        const productsAddToCart = order.products.map(({ product, variant, quantity }) => ({
          productId: product._id,
          variantId: variant._id,
          quantity
        }))
        await dispatch(addProductsToCart(productsAddToCart)).unwrap()
        navigate(routesConfig.cart, {
          state: {
            orderProducts: productsAddToCart
          }
        })
      } catch (error) {
        toast.error(error.messages[0])
      } finally {
        toast.dismiss(loadingToast)
      }
    },
    [navigate]
  )

  return (
    <>
      <DocumentTitle title='Order Details' />
      {order ? (
        <>
          <div className="container">
            <Card className="shadow-card-md p-0">
              <div className="flex justify-between gap-4 px-[24px] py-[20px]">
                <p>
                  <span className="font-medium mr-1">Order ID:</span>
                  {order?._id}
                </p>
                <p
                  className={clsx('text-primary-400 font-medium uppercase', {
                    'text-red-600': order.status === OrderStatusesEnum.CANCELED.value,
                    'text-primary-400': order.status !== OrderStatusesEnum.CANCELED.value
                  })}
                >
                  {OrderStatusesEnum[order.status].name}
                </p>
              </div>

              <Divider />

              <div className='px-[24px] py-[20px]'>
                <h3 className="md:text-[18px] text-primary-400 font-medium">
                  <LocationDotIcon className="inline-block mr-1.5" />
                  Shipping Address
                </h3>
                <div className="pt-[8px] flex flex-col lg:flex-row gap-6 text-[14px] md:text-[18px] lg:text-[16px]">
                  <div className="flex lg:items-center gap-2 lg:gap-6 flex-col lg:flex-row">
                    <span className="font-semibold">{`${firstName} ${lastName}`}</span>
                    <span className="font-semibold">{mobile}</span>
                    <span>
                      {order?.shippingAddress
                        ? `${
                          order?.shippingAddress?.streetAddress
                            ? order?.shippingAddress?.streetAddress + ', '
                            : ''
                        }
                      ${order?.shippingAddress?.ward.name},
                      ${order?.shippingAddress?.district.name},
                      ${order?.shippingAddress?.province.name}`
                        : 'Pick up in store'}
                    </span>
                  </div>
                  <button
                    className="hidden lg:block lg:ml-9 text-[14px] text-blue-500 hover:text-red-500"
                    onClick={handleChangeShippingAddressClick}
                  >
                    Change address
                  </button>
                  <Button
                    className="block lg:hidden"
                    primary
                    rounded
                    outlined
                    onClick={handleChangeShippingAddressClick}
                  >
                    Change address
                  </Button>
                </div>
              </div>

              <Divider />

              <div className='px-[24px] py-[20px]'>
                <h3 className='md:text-[18px] text-primary-400 font-medium'>Order Products</h3>
                <ul>
                  {order?.products?.map(({ product, variant, quantity, price }, index) => (
                    <li key={index} className="flex items-center gap-3 pt-[16px]">
                      <img
                        src={variant.images[0]}
                        className="w-[80px] h-[80px] object-cover"
                      />
                      <div className="flex-1 flex flex-col md:flex-row gap-[6px] md:gap-0">
                        <div className="flex-1 flex flex-col gap-[6px]">
                          <p className="line-clamp-2 font-medium">{product.title}</p>
                          <p className="text-gray-500 text-[14px]">
                                      Variant: {variant.name}
                          </p>
                        </div>
                        <div className="text-[14px]">
                          <div className="flex md:justify-end items-center gap-[28px]">
                            <span className="">{formatCash(price)}</span>
                            <span>{`x${quantity}`}</span>
                          </div>
                          <div className="flex md:justify-end items-center mt-[6px] md:mt-0">
                            <span className="hidden md:block">Total amount:</span>
                            <span className="text-[16px] md:text-[18px] font-medium text-primary-400 md:ml-[8px]">
                              {formatCash(price * quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              <div className="px-[24px] py-[20px]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 pb-6 border-b">
                  <h3 className="md:text-[18px] text-primary-400 font-medium">
                  Payment methods
                  </h3>
                  <div>
                    {PaymentMethodsEnum[order.paymentMethod].name}
                  </div>
                </div>
                <div className="md:flex md:items-center md:justify-end pt-6">
                  <table className="w-full md:w-auto text-[14px] md:text-[16px]">
                    <tbody>
                      <tr>
                        <td className="pr-2 md:pr-10 font-medium">Total Price</td>
                        <td className="text-end">
                          {formatCash(order?.totalProductsPrice)}
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-2 md:pr-10 font-medium">
                          Shipping Fee
                        </td>
                        <td className="text-end">
                          {formatCash(order?.shippingFee)}
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-2 md:pr-10 font-medium">Total Payment</td>
                        <td className="text-[18px] font-medium text-primary-400 text-end">
                          {formatCash(order?.totalPayment)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="px-[24px] py-[20px] flex flex-col md:flex-row md:justify-end gap-[10px]">
                {order.status === OrderStatusesEnum.CANCELED.value && (
                  <Button
                    primary
                    rounded
                    disabled={disabled}
                    onClick={() => handleRepurchase(order)}
                  >
                    Repurchase
                  </Button>
                )}

                {order.status === OrderStatusesEnum.PENDING.value && (
                  <Button
                    rounded
                    outlined
                    disabled={disabled}
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </Button>
                )}

                {(order.status === OrderStatusesEnum.PAID.value ||
                              order.status === OrderStatusesEnum.CONFIRMED.value) && (
                  <Button rounded outlined>
                    Request To Cancel Order
                  </Button>
                )}
              </div>
            </Card>
          </div>
          {openModal && (
            <Modal onClose={handleCloseModal}>
              {openChangeShippingAddress && (
                <ChangeShippingAddress
                  orderId={order._id}
                  currentAddressId={order.shippingAddress._id}
                  setOrder={setOrder}
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
      ) : (
        <ModalLoading />
      )}
    </>

  )
}

export default OrderDetails
