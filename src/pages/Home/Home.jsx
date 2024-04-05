import { SideBar } from './SideBar'
import { Slider } from './Slider'

function Home() {
  return (
    <>
      <section>
        <div className='container grid grid-cols-12 gap-5'>
          <SideBar />
          <Slider />
        </div>
      </section>
    </>
  )
}

export default Home
