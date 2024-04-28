import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Footer, Header } from '~/layouts/components'
import { appSelector } from '~/redux/selectors'

function DefaultLayout({ children }) {
  const { loading } = useSelector(appSelector)
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Header />
      <main className='py-2 md:py-4 lg:py-6 flex-1 relative'>{children}</main>
      {!loading && <Footer />}
      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  )
}

export default DefaultLayout
