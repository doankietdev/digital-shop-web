/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div className='grid grid-cols-4 gap-5'>
      <div className='col-span-2 h-[656px]'>
        <Link
          className='banner h-full'
          to='http://localhost:3000/products/asus-rog-g752vm-1712644060821'
        >
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
            alt=''
            className='w-full h-full object-cover'
          />
        </Link>
      </div>
      <div className='col-span-1 h-[656px] grid grid-rows-2 gap-5'>
        <Link
          className='banner h-full'
          to='http://localhost:3000/products/hp-probook-450-1712644059490'
        >
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661'
            alt=''
            className='w-full h-full object-cover'
          />
        </Link>
        <Link
          className='banner h-full'
          to='http://localhost:3000/products/hp-probook-450-1712644059490'
        >
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661'
            alt=''
            className='w-full h-full object-cover'
          />
        </Link>
      </div>
      <div className='col-span-1 h-[656px]'>
        <Link
          className='banner h-full'
          to='http://localhost:3000/products/hp-probook-450-1712644059490'
        >
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
            alt=''
            className='w-full h-full object-cover'
          />
        </Link>
      </div>
    </div>
  )
}

export default memo(Banner)
