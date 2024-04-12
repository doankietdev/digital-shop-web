import { Button, Input } from '~/components'
import {
  FaGooglePlusGIcon,
  FaFacebookFIcon,
  FaLinkedinInIcon,
  FaGithubIcon
} from '~/utils/icons'

function SignIn() {
  return (
    <form className='px-10 h-full flex justify-center items-center flex-col'>
      <h1 className='text-[32px] font-semibold capitalize'>Sign In</h1>
      <div className='flex gap-3 my-5'>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaGooglePlusGIcon />
        </a>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaFacebookFIcon />
        </a>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaGithubIcon />
        </a>
        <a
          href='#'
          className='w-[40px] h-[40px] border flex justify-center items-center rounded-lg hover:border-[2px]'
        >
          <FaLinkedinInIcon />
        </a>
      </div>
      <span className='text-[12px] font-light'>or use your email password</span>
      <div className='flex flex-col gap-5 w-full text-[13px] mt-[10px]'>
        <Input type='email' placeholder='Email' outlined rounded />
        <Input type='password' placeholder='Password' outlined rounded />
      </div>
      <a href='#' className='mt-[24px] text-[13px] font-light mb-[25px]'>
        Forget Your Password?
      </a>
      <Button rounded>Sign In</Button>
    </form>
  )
}

export default SignIn
