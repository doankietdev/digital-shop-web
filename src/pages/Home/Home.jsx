import { ProductSlider } from './ProductSlider'
import SideBar from './SideBar'
import Slider from './Slider'
import DailyDeal from './DailyDeal'

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
        <div className='container grid grid-cols-12 gap-5'>
          <DailyDeal />
          <ProductSlider />
        </div>
      </section>
    </>
  )
}

export default Home
