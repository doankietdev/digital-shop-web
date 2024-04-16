import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Button, Card } from '~/components'
import { routesConfig } from '~/config'
import { MdErrorOutlineIcon } from '~/utils/icons'

function EmailVerificationError() {
  return (
    <div
      className={clsx(
        'bg-red-900 flex justify-center items-center h-screen bg-cover bg-no-repeat'
      )}
    >
      <Card className='bg-red-700 fade-in'>
        <MdErrorOutlineIcon className='w-[200px] h-[200px] text-white' />
        <h2 className='mb-2 font-semibold text-2xl tracking-[2px] text-white'>
          Whoops!!
        </h2>
        <h3 className='mb-2 font-semibold text-[15px] tracking-[1px] text-white'>
          We had trouble verifying your email.
        </h3>
        <Link to={routesConfig.home()}>
          <Button className='border-white text-white' outlined rounded>
            Back to home
          </Button>
        </Link>
      </Card>
    </div>
  )
}

export default EmailVerificationError
