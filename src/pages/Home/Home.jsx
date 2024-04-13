import clsx from 'clsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { Loading } from '~/components'
import { appSelector } from '~/redux/selectors'
import Banner from './Banner'
import DailyDeals from './DailyDeals'
import FeaturedProducts from './FeaturedProducts'
import NewArrivals from './NewArrivals'
import { ProductSlider } from './ProductSlider'
import SideBar from './SideBar'
import Slider from './Slider'

function Home() {
  const { loading } = useSelector(appSelector)

  useEffect(() => {
    const signIn = sessionStorage.getItem('signIn')
    if (signIn) {
      sessionStorage.removeItem('signIn')
      toast.success('Sign in successfully! 🎉')
    }
  }, [])

  return (
    <>
      <div
        className={clsx({
          hidden: loading
        })}
      >
        <section>
          <div className='container grid grid-cols-12 gap-5'>
            <SideBar />
            <Slider />
          </div>
        </section>

        <section className='mt-8'>
          <div className='container h-[608px] grid grid-cols-12 gap-5'>
            <DailyDeals />
            <ProductSlider />
          </div>
        </section>

        <section className='mt-8'>
          <div className='container'>
            <FeaturedProducts />
          </div>
        </section>

        <section className='mt-8'>
          <div className='container'>
            <Banner />
          </div>
        </section>

        <section className='mt-8'>
          <div className='container'>
            <NewArrivals />
          </div>
        </section>
      </div>

      {loading && (
        <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center'>
          <div className='mt-[140px]'>
            <Loading />
          </div>
        </div>
      )}

      <ToastContainer autoClose={2000} />
    </>
  )
}

export default Home
