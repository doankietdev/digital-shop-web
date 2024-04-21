import clsx from 'clsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
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
      toast.success('Sign in successfully! 🎉')
      sessionStorage.removeItem('signIn')
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
          <div className='container md:grid md:grid-cols-4 md:gap-5'>
            <SideBar />
            <Slider />
          </div>
        </section>

        <section className='mt-8'>
          <div className='container min-h-[608px] grid-cols-1 grid md:grid-cols-4  gap-5'>
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
    </>
  )
}

export default Home
