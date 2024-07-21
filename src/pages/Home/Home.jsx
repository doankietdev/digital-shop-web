import { DocumentTitle } from '~/components'
import Advertise from './Advertise'
import Banners from './Banners'
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

function Home() {
  return (
    <>
      <DocumentTitle />
      <div>
        <section>
          <div className='container lg:grid lg:grid-cols-4 lg:gap-5'>
            <SideBar />
            <Banners />
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
            <Advertise />
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
