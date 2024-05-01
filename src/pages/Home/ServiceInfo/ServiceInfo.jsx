import {
  HeadsetIcon,
  IdCardIcon,
  ShieldIcon,
  ShippingFastIcon
} from '~/utils/icons'

function ServiceInfo() {
  return (
    <ul className='grid grid-cols-4 gap-12'>
      <li className='p-[30px] bg-white shadow-card rounded-lg'>
        <span className='m-auto w-[70px] h-[70px] rounded-full bg-[#F3F5F9] flex justify-center items-center'>
          <ShippingFastIcon className='text-[32px]' />
        </span>
        <h3 className='text-[17px] font-medium mt-5 text-center'>
          Worldwide Delivery
        </h3>
        <p className='text-gray-600 text-[15px] text-center mt-5'>
          We offer competitive prices on our 100 million plus product any range.
        </p>
      </li>
      <li className='p-[30px] bg-white shadow-card rounded-lg'>
        <span className='m-auto w-[70px] h-[70px] rounded-full bg-[#F3F5F9] flex justify-center items-center'>
          <IdCardIcon className='text-[32px]' />
        </span>
        <h3 className='text-[17px] font-medium mt-5 text-center'>
          Safe Payment
        </h3>
        <p className='text-gray-600 text-[15px] text-center mt-5'>
          We offer competitive prices on our 100 million plus product any range.
        </p>
      </li>
      <li className='p-[30px] bg-white shadow-card rounded-lg'>
        <span className='m-auto w-[70px] h-[70px] rounded-full bg-[#F3F5F9] flex justify-center items-center'>
          <ShieldIcon className='text-[32px]' />
        </span>
        <h3 className='text-[17px] font-medium mt-5 text-center'>
          Shop With Confidence
        </h3>
        <p className='text-gray-600 text-[15px] text-center mt-5'>
          We offer competitive prices on our 100 million plus product any range.
        </p>
      </li>
      <li className='p-[30px] bg-white shadow-card rounded-lg'>
        <span className='m-auto w-[70px] h-[70px] rounded-full bg-[#F3F5F9] flex justify-center items-center'>
          <HeadsetIcon className='text-[32px]' />
        </span>
        <h3 className='text-[17px] font-medium mt-5 text-center'>
          24/7 Support
        </h3>
        <p className='text-gray-600 text-[15px] text-center mt-5'>
          We offer competitive prices on our 100 million plus product any range.
        </p>
      </li>
    </ul>
  )
}

export default ServiceInfo
