import { Header, NavBar, Footer } from '~/layouts/components'

function DefaultLayout({ children }) {
  return (
    <div className='w-full flex flex-col items-center'>
      <Header />
      <NavBar />
      <div className='w-main'>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
