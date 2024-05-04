import clsx from 'clsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DocumentTitle, GlobalLoading } from '~/components'
import { appSelector } from '~/redux/selectors'
import Banner from './Banner'
import BestSellingAccessory from './BestSellingAccessory'
import BestSellingLaptop from './BestSellingLaptop'
import BestSellingSmartphone from './BestSellingSmartphone'
import BestSellingTablet from './BestSellingTablet'
import BestSellingTelevision from './BestSellingTelevision'
import Brand from './Brand'
import DailyDeals from './DailyDeals'
import FeaturedProducts from './FeaturedProducts'
import { ProductSlider } from './ProductSlider'
import ServiceInfo from './ServiceInfo'
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
      <DocumentTitle />
      {loading && (
        <GlobalLoading />
      )}
      <div
        className={clsx('animate-fadeIn', {
          hidden: loading
        })}
      >
        <section>
          <div className='container lg:grid lg:grid-cols-4 lg:gap-5'>
            <SideBar />
            <Slider />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <Brand />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container min-h-[608px] grid-cols-1 grid md:grid-cols-4  gap-5'>
            <DailyDeals />
            <ProductSlider />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <FeaturedProducts />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <Banner />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <BestSellingSmartphone />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <BestSellingTablet />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <BestSellingLaptop />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <BestSellingTelevision />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <BestSellingAccessory />
          </div>
        </section>

        <section className='mt-10 lg:mt-16'>
          <div className='container'>
            <ServiceInfo />
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
