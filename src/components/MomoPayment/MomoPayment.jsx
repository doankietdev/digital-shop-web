import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import paymentService from '~/services/paymentService';
import { toast } from 'react-toastify';
import { FaMoneyBillWave } from 'react-icons/fa';

function MomoPayment({ orderProducts }) {

  const handleMomoPayment = async () => {
    try {
      // const { payUrl } = await paymentService.createMomoOrder(orderProducts);
      const payUrl = 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay';
      if (payUrl) {
        window.location.href = payUrl;
      } else {
        toast.error('Failed to get payment URL');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <button
        onClick={handleMomoPayment}
        className="bg-pink-500 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-pink-600"
      >
        <FaMoneyBillWave className="mr-2" />
        Pay with Momo
      </button>
    </div>
  );
}

export default MomoPayment;