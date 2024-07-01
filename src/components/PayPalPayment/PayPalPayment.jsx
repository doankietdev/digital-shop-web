import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import paymentService from '~/services/paymentService'

function PayPalPayment({ orderProducts }) {
  return (
    <PayPalButtons
      style={{
        label: 'pay',
        layout: 'horizontal',
        height: 40
      }}
      createOrder={async () => {
        const loadingToast = toast.loading('Initialing PayPal...')
        try {
          const { id } = await paymentService.createPayPalOrder(orderProducts)
          return id
        } catch (error) {
          toast.error(error.messages[0])
        } finally {
          toast.dismiss(loadingToast)
        }
      }}
      onApprove={async (data) => {
        try {
          const { status } = await paymentService.capturePayPalOrder({
            paypalOrderId: data.orderID,
            orderProducts
          })
          if (status !== 'COMPLETED') {
            toast.error('Something went wrong')
          }
          // navigate to orders page
        } catch (error) {
          toast.error(error.messages[0])
        }
      }}
    />
  )
}

export default PayPalPayment
