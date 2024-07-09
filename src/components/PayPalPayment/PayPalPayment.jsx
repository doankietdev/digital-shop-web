import { PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { routesConfig } from '~/config'
import paymentService from '~/services/paymentService'
import { OrderStatusesEnum } from '~/utils/constants'

function PayPalPayment({ orderProducts }) {
  const navigate = useNavigate()

  return (
    <PayPalButtons
      style={{
        label: 'pay',
        layout: 'horizontal',
        height: 40
      }}
      createOrder={async () => {
        const { id } = await paymentService.createPayPalOrder(orderProducts)
        return id
      }}
      onApprove={async (data) => {
        const { status } = await paymentService.capturePayPalOrder({
          paypalOrderId: data.orderID,
          orderProducts
        })
        if (status !== 'COMPLETED') {
          toast.error('Something went wrong')
        }
        navigate(`${routesConfig.orders}?status=${OrderStatusesEnum.PAID.value}`)
      }}
      onError={(error) => {
        toast.error(error.messages[0])
      }}
    />
  )
}

export default PayPalPayment
