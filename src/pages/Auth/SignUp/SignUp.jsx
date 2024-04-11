import { Button } from '~/components'
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
        <input
          type='text'
          placeholder='First Name'
          className='w-full px-[15px] py-[10px] bg-transparent border-[1px] rounded-lg outline-none hover:border-[2px] focus:border-[2px]'
        />
        <input
          type='text'
          placeholder='Last Name'
          className='w-full px-[15px] py-[10px] bg-transparent border-[1px] rounded-lg outline-none hover:border-[2px] focus:border-[2px]'
        />
        <input
          type='text'
          placeholder='Phone Number'
          className='w-full px-[15px] py-[10px] bg-transparent border-[1px] rounded-lg outline-none hover:border-[2px] focus:border-[2px]'
        />
        <input
          type='email'
          placeholder='Email'
          className='w-full px-[15px] py-[10px] bg-transparent border-[1px] rounded-lg outline-none hover:border-[2px] focus:border-[2px]'
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full px-[15px] py-[10px] bg-transparent border-[1px] rounded-lg outline-none hover:border-[2px] focus:border-[2px]'
        />
        <input
          type='password'
          placeholder='Confirm Password'
          className='w-full px-[15px] py-[10px] bg-transparent border-[1px] rounded-lg outline-none hover:border-[2px] focus:border-[2px]'
        />
      </div>
      <Button rounded>Sign Up</Button>
    </form>
  )
}

export default SignUp
