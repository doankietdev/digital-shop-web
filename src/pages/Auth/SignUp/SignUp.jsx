import { Button, Input } from '~/components'
import {
  FaGooglePlusGIcon,
  FaFacebookFIcon,
  FaLinkedinInIcon,
  FaGithubIcon
} from '~/utils/icons'

function SignUp() {
  return (
    <form className='px-10 h-full flex justify-center items-center flex-col'>
      <h1 className='text-[32px] font-semibold capitalize'>Sign Up</h1>
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
      <span className='text-[12px] font-light'>
        or use your email for sign up
      </span>
      <div className='flex flex-col gap-5 w-full text-[13px] mt-[10px] mb-[25px]'>
        <Input type='text' placeholder='First Name' outlined rounded />
        <Input type='text' placeholder='Phone Number' outlined rounded />
        <Input type='email' placeholder='Email' outlined rounded />
        <Input type='password' placeholder='Password' outlined rounded />
        <Input
          type='password'
          placeholder='Confirm Password'
          outlined
          rounded
        />
      </div>
      <Button rounded>Sign Up</Button>
    </form>
  )
}

export default SignUp
