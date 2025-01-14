import { Loading } from '~/components'

function ModalLoading() {
  return (
    <div className="fixed z-[1000] inset-0 flex justify-center items-center bg-black/50">
      <Loading />
    </div>
  )
}

export default ModalLoading
