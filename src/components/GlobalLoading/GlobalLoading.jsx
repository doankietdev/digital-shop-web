import { Loading } from '~/components'

function GlobalLoading() {
  return (
    <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center'>
      <div className='mt-[140px]'>
        <Loading />
      </div>
    </div>
  )
}

export default GlobalLoading
