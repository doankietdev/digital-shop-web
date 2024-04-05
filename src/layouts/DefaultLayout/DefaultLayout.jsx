import { Header, NavBar, Footer } from '~/layouts/components'

function DefaultLayout({ children }) {
  return (
    <div className='w-full'>
      <Header />
      <NavBar />
      <div className='container'>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
