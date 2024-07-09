import { Card } from '~/components'
import { UserBar } from '~/layouts/components'
import { DefaultLayout } from '~/layouts'

function UserLayout({ children }) {
  return (
    <DefaultLayout>
      <div className="container">
        <div className="flex items-start gap-10">
          <Card className='p-[20px] basis-[260px]'><UserBar /></Card>
          <div className='flex-1'>{children}</div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default UserLayout
