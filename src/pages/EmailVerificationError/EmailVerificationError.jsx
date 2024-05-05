import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Button, Card, DocumentTitle } from '~/components'
import { routesConfig } from '~/config'
import { MdErrorOutlineIcon } from '~/utils/icons'

function EmailVerificationError() {
  return (
    <>
      <DocumentTitle title='Email Verification Error' />
      <div
        className={clsx(
          'bg-red-900 flex justify-center items-center h-screen bg-cover bg-no-repeat p-5'
        )}
      >
        <Card className='!bg-red-700 animate-fadeIn flex flex-col items-center justify-center max-w-[860px] w-full max-h-[520px] p-10'>
          <MdErrorOutlineIcon className='w-[200px] h-[200px] text-white' />
          <h2 className='mb-3 font-semibold text-2xl tracking-[2px] text-white'>
            Whoops!!
          </h2>
          <h3 className='mb-6 font-semibold text-[15px] tracking-[1px] text-white text-center'>
            We had trouble verifying your email.
          </h3>
          <Link to={routesConfig.home} className='w-full md:w-auto'>
            <Button className='border-white text-white w-full md:w-auto' outlined rounded>
              Back to home
            </Button>
          </Link>
        </Card>
      </div>
    </>
  )
}

export default EmailVerificationError
