import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import paymentService from '~/services/paymentService';
import { toast } from 'react-toastify'
import { FaMoneyBillWave } from 'react-icons/fa'
import paymentService from '~/services/paymentService'

function MomoPayment({ orderProducts }) {

  const handleMomoPayment = async () => {
    const loadingToast = toast.loading('Redirecting Momo Payment Page')
    try {
      const { payUrl } = await paymentService.initMomoPayment(orderProducts)
      if (payUrl) {
        window.location.href = payUrl
      } else {
        toast.error('Cannot pay with Momo. Please try again!')
      }
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  return (
    <div className='flex'>
      <button
        onClick={handleMomoPayment}
        className="flex-1 bg-pink-500 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-pink-600"
      >
        <FaMoneyBillWave className="mr-2" />
        Pay with Momo
      </button>
    </div>
  )
}

export default MomoPayment
