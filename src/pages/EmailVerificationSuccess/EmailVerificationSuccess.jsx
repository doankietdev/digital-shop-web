import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Button, Card, DocumentTitle } from '~/components'
import { routesConfig } from '~/config'
import { TbMailCheckIcon } from '~/utils/icons'

function EmailVerificationSuccess() {
  return (
    <>
      <DocumentTitle title='Email Verification Success' />
      <div
        className={clsx(
          'bg-[#01463B] flex justify-center items-center h-screen bg-cover bg-no-repeat'
        )}
      >
        <Card className='!bg-[#005445] animate-fadeIn'>
          <TbMailCheckIcon className='w-[200px] h-[200px] text-white' />
          <h2 className='mb-2 font-semibold text-2xl tracking-[2px] text-white'>
            Email verified successfully! 🎉
          </h2>
          <h3 className='mb-2 font-semibold text-[15px] tracking-[1px] text-white'>
            You can now sign in
          </h3>
          <Link to={routesConfig.auth}>
            <Button className='border-white text-white' outlined rounded>
              Sign in
            </Button>
          </Link>
        </Card>
      </div>
    </>
  )
}

export default EmailVerificationSuccess
