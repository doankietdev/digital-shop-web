import { Header, NavBar, Footer } from '~/layouts/components'

function DefaultLayout({ children }) {
  return (
    <div className='w-full'>
      <Header />
      <NavBar />
      <main className='mt-8'>{children}</main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
