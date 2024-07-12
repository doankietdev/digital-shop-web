import { DefaultLayout } from '~/layouts'
import { UserBar } from '~/layouts/components'

function UserLayout({ children }) {
  return (
    <DefaultLayout>
      <div className="container">
        <div className='border-b'><UserBar /></div>
        <div className='pt-[30px]'>{children}</div>
      </div>
    </DefaultLayout>
  )
}

export default UserLayout
