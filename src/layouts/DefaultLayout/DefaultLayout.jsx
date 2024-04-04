import { Header } from '~/layouts/components'

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className='container'>{children}</div>
    </>
  )
}

export default DefaultLayout
