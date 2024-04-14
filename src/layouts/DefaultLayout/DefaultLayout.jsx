import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Header, NavBar, Footer } from '~/layouts/components'
import { appSelector } from '~/redux/selectors'

function DefaultLayout({ children }) {
  const { loading } = useSelector(appSelector)
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Header />
      <NavBar />
      <main className='my-8 flex-1 relative'>{children}</main>
      {!loading && <Footer />}
      <ToastContainer position='bottom-left' autoClose={2000} />
    </div>
  )
}

export default DefaultLayout
