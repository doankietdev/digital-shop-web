import { ToastContainer } from 'react-toastify'
import { Footer, Header } from '~/layouts/components'

function DefaultLayout({ children }) {
  return (
    <div className='w-full min-h-screen flex flex-col bg-[#F6F9FC]'>
      <Header />
      <main className='pt-2 pb-10 md:pt-6 md:pb-14 flex-1 relative'>{children}</main>
      {<Footer />}
      <ToastContainer position='bottom-right' autoClose={2000} />
    </div>
  )
}

export default DefaultLayout
