import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, PasswordField, TextField } from '~/components'
import {
  FaGooglePlusGIcon,
  FaFacebookFIcon,
  FaLinkedinInIcon,
  FaGithubIcon
} from '~/utils/icons'

function SignUpForm({ onSubmit }) {
  const schema = yup.object({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    mobile: yup.string().required('Please enter your phone number'),
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup.string().required('Please re-enter your password')
  })

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = (data) => {
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(data)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className='px-10 h-full flex justify-center items-center flex-col'
    >
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
      <div className='flex flex-col gap-3 w-full text-[13px] mt-[10px] mb-[25px]'>
        <TextField
          form={form}
          name='firstName'
          placeholder='First Name'
          outlined
          rounded
        />
        <TextField
          form={form}
          name='lastName'
          placeholder='Last Name'
          outlined
          rounded
        />
        <TextField
          form={form}
          name='mobile'
          placeholder='Phone Number'
          outlined
          rounded
        />
        <TextField
          form={form}
          name='email'
          placeholder='Email'
          outlined
          rounded
        />
        <PasswordField
          form={form}
          name='password'
          placeholder='Password'
          outlined
          rounded
        />
        <PasswordField
          form={form}
          name='confirmPassword'
          placeholder='Confirm Password'
          outlined
          rounded
        />
      </div>
      <Button type='submit' rounded>
        Sign Up
      </Button>
    </form>
  )
}

export default SignUpForm
