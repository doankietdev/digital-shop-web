import { Link } from 'react-router-dom'
import collage from '~/assets/collage_404.webp'
import { Button } from '~/components'
import { routesConfig } from '~/config'

function PageNotFound() {
  return (
    <div className='w-screen h-screen p-[15px] lg:pt-[60px] flex flex-col justify-center items-center text-center relative overflow-hidden'>
      <img className='max-h-[calc(100%-30px)] max-w-[calc(100%-30px)]' src={collage} alt="404" />
      <div className='flex flex-col justify-center items-center w-[280px] h-[280px] md:w-[592px] md:h-[592px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 before:absolute before:top-0 before:left-0 before:z-[-1] before:w-full before:h-full before:shadow-md before:backdrop-blur-lg before:rounded-full'>
        <span className='text-[#00193B] text-[36px] md:text-[120px] font-bold'>404</span>
        <h1 className='text-[#00193B] text-[20px] md:text-[38px] font-bold tracking-widest'>Page Not Found</h1>
        <Link to={routesConfig.home} className='mt-[20px] md:mt-[40px]'>
          <Button primary rounded className=''>Back to Home Page</Button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
