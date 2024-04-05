import { SideBar } from './SideBar'
import { Slider } from './Slider'

function Home() {
  return (
    <>
      <section className='flex gap-5'>
        <SideBar />
        <Slider />
      </section>
    </>
  )
}

export default Home
