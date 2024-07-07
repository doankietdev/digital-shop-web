import { Card } from '~/components'
import { UserBar } from '~/layouts/components'
import { DefaultLayout } from '~/layouts'

function UserLayout({ children }) {
  return (
    <DefaultLayout>
      <div className="container">
        <div className="flex gap-10">
          <Card className='p-[20px] basis-[260px]'><UserBar /></Card>
          <Card className='p-[20px] flex-1'>{children}</Card>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default UserLayout
