import { Footer, Header } from '~/layouts/components'

function DefaultLayout({ children }) {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Header />
      <main className='pt-2 pb-10 md:pt-6 md:pb-14 flex-1 relative min-h-screen'>{children}</main>
      {<Footer />}
    </div>
  )
}

export default DefaultLayout
