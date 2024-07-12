import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import orderImage from '~/assets/order.png'
import { BouceLoading, Button, Card, Divider, DocumentTitle, Pagination } from '~/components'
import { routesConfig } from '~/config'
import { dispatch } from '~/redux'
import { cancelOrder } from '~/services/checkoutService'
import orderService from '~/services/orderService'
import { OrderStatusesEnum } from '~/utils/constants'
import { formatCash, parsePlaceHolderUrl } from '~/utils/formatter'
import { addProductsToCart } from '../Cart/CartSlice'

const LIMIT = 10
const DEFAULT_PAGE = 1

const tabs = [
  {
    name: 'All',
    value: 'ALL'
  },
  ...Object.keys(OrderStatusesEnum).map(key => OrderStatusesEnum[key])
]

function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [pagination, setPagination] = useState(() => {
    const page = parseInt(searchParams.get('_page'))

    if (page) {
      return {
        page,
        limit: LIMIT,
        totalPages: 1
      }
    }

    setSearchParams(prev => ({
      ...prev,
      _page: DEFAULT_PAGE
    }))

    return {
      page: DEFAULT_PAGE,
      limit: LIMIT,
      totalPages: 1
    }
  })

  const selectedTabValue = useMemo(() => {
    const status = searchParams.get('status')
    const foundTab = tabs.find(tab => tab.value === status)
    if (!foundTab) return tabs[0].value
    return foundTab.value
  }, [searchParams])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { items, totalPages } = await orderService.getOrdersOfCurrentUser({
          status: selectedTabValue === tabs[0].value ? undefined : selectedTabValue,
          _page: pagination.page,
          _limit: pagination.limit
        })
        setOrders(items)
        setPagination(prev => ({
          ...prev,
          totalPages
        }))
      } catch (error) {
        // navigate to other page
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [selectedTabValue, pagination.page, pagination.limit])

  const handleSelectTab = useCallback(
    value => {
      setSearchParams(prev => ({
        ...prev,
        status: value
      }))
    },
    [setSearchParams]
  )

  const handlePageChange = useCallback(
    async ({ selected }) => {
      setSearchParams(prev => ({
        ...prev,
        _page: selected + 1
      }))
      setPagination(prev => ({
        ...prev,
        page: selected + 1
      }))
      window.scrollTo({ top: 0 })
    },
    [setSearchParams]
  )

  const handleCancelOrder = useCallback(
    async orderId => {
      const loadingToast = toast.loading('Cancelling order...')
      try {
        setDisabled(true)
        await cancelOrder(orderId)
        const { items, totalPages } = await orderService.getOrdersOfCurrentUser({
          status: selectedTabValue,
          _page: pagination.page,
          _limit: pagination.limit
        })
        setOrders(items)
        setPagination(prev => ({
          ...prev,
          totalPages
        }))
        toast.success('Cancel order successfully')
      } catch (error) {
        toast.error(error.messages[0])
      } finally {
        setDisabled(false)
        toast.dismiss(loadingToast)
      }
    },
    [pagination.limit, pagination.page, selectedTabValue]
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

  const handleSeeOrderDetails = useCallback(
    orderId => {
      navigate(
        parsePlaceHolderUrl(routesConfig.orderDetails, {
          orderId
        })
      )
    },
    [navigate]
  )

  return (
    <>
      <DocumentTitle title="Orders" />
      <div className='flex justify-center'>
        <div className='max-w-[800px] w-full'>
          <h2 className='font-medium text-[18px] text-center'>My Addresses</h2>
          <div className='mt-7'>
            <Card>
              <ul
                className="flex items-center top-0 left-0 right-0 lg:static
                  overflow-x-auto no-scrollbar"
              >
                {tabs.map((tab, index) => (
                  <li
                    key={index}
                    className={clsx(
                      `py-[8px] md:py-[16px] px-[16px] cursor-pointer select-none
                        flex items-center p-[12px] underline-run hover:text-primary-400`,
                      {
                        'text-primary-400 after:cursor-pointer after:absolute after:bottom-0 after:left-0 after:bg-primary-400 after:h-0.5 after:w-full': selectedTabValue === tab.value
                      }
                    )}
                    onClick={() => handleSelectTab(tab.value)}
                  >
                    {tab.name}
                  </li>
                ))}
              </ul>
            </Card>

            {loading ? (
              <div className="mt-8 flex justify-center">
                <BouceLoading className="w-[8px] h-[8px] !mx-[5px] bg-primary-400" />
              </div>
            ) : (
              <>
                {orders.length > 0 ? (
                  <>
                    <ul className="mt-5 flex flex-col gap-6">
                      {orders.map(order => (
                        <Card key={order._id}>
                          <div className="pt-[24px] px-[12px] pb-[12px]">
                            <div className="pb-[12px] flex flex-col-reverse md:flex-row justify-between md:items-center gap-1 md:gap-0">
                              <p>
                                <span className="font-medium">Order ID:</span> {order._id}
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
                            <ul>
                              {order.products.map(({ product, variant, quantity, price }, index) => (
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
                          <div className="pt-[24px] px-[12px] pb-[12px]">
                            <div className="flex items-center md:justify-end">
                              <span className="mr-[10px]">Total amount:</span>
                              <span className="text-[20px] md:text-[24px] font-medium text-primary-400">
                                {formatCash(order.totalPayment)}
                              </span>
                            </div>
                          </div>
                          <div className="pt-[12px] px-[12px] pb-[24px] md:flex md:items-center md:gap-[56px]">
                            <div className="text-[12px] flex-1 hidden md:block">
                              {order.status === OrderStatusesEnum.CANCELED && (
                                <span>Canceled by {'you'}</span>
                              )}
                            </div>
                            <div className="flex flex-col md:flex-row gap-[10px]">
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

                              <Button
                                rounded
                                outlined
                                disabled={disabled}
                                onClick={() => handleSeeOrderDetails(order._id)}
                              >
                            See Order Details
                              </Button>

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
                                <Button rounded outlined disabled={disabled}>
                              Request To Cancel Order
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </ul>
                    {!loading && (
                      <div className="mt-5">
                        <Pagination
                          totalPages={pagination.totalPages}
                          page={pagination.page - 1}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Card className="mt-5 h-[500px] flex flex-col justify-center items-center">
                    <img src={orderImage} className="w-[100px] h-[100px] object-contain" />
                    <span className="mt-[20px] text-[18px] text-gray-700">No Orders Yet</span>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
