import { ProductSlider } from './ProductSlider'
import SideBar from './SideBar'
import Slider from './Slider'
import DailyDeals from './DailyDeals'
import FeaturedProducts from './FeaturedProducts'
import Banner from './Banner'
import NewArrivals from './NewArrivals'

function Home() {
  return (
    <>
      <section>
        <div className='container grid grid-cols-12 gap-5'>
          <SideBar />
          <Slider />
        </div>
      </section>

      <section className='mt-5'>
        <div className='container h-[608px] grid grid-cols-12 gap-5'>
          <DailyDeals />
          <ProductSlider />
        </div>
      </section>

      <section className='mt-5'>
        <div className='container'>
          <FeaturedProducts />
        </div>
      </section>

      <section className='mt-5'>
        <div className='container'>
          <Banner />
        </div>
      </section>

      <section className='mt-5'>
        <div className='container'>
          <NewArrivals />
        </div>
      </section>
    </>
  )
}

export default Home
