import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { Button } from '~/components'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import styles from './Auth.module.css'
import authBackground from '~/assets/auth-background.jpg'

function Auth() {
  const container = useRef(null)
  const signUpFormRef = useRef(null)
  const signInFormRef = useRef(null)

  const handleSwitchSignUp = () => {
    container.current.classList.add(styles.active)
    signInFormRef.current.reset()
  }

  const handleSwitchSignIn = () => {
    container.current.classList.remove(styles.active)
    signUpFormRef.current.reset()
  }

  const handleSignUp = (data) => {}

  const handleSignIn = (data) => {}

  return (
    <div
      style={{
        backgroundImage: `url(${authBackground})`
      }}
      className='flex justify-center items-center h-[100vh] bg-cover bg-no-repeat'
    >
      <div
        className={clsx(
          styles.container,
          'relative bg-transparent backdrop-blur-lg w-[768px] max-w-full min-h-[680px] rounded-[30px] text-white'
        )}
        ref={container}
      >
        <div
          className={clsx(
            styles.signUp,
            'absolute top-0 left-0 h-full opacity-0 z-[1] transition-all duration-[600ms] ease-in-out w-1/2'
          )}
        >
          <SignUpForm ref={signUpFormRef} onSubmit={handleSignUp} />
        </div>
        <div
          className={clsx(
            styles.signIn,
            'absolute top-0 left-0 h-full z-[2]  transition-all duration-[600ms] ease-in-out w-1/2 rounded-t-[150px]'
          )}
        >
          <SignInForm ref={signInFormRef} onSubmit={handleSignIn} />
        </div>
        <div
          className={clsx(
            styles.toggleContainer,
            'absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-all duration-[600ms] ease-in-out z-10'
          )}
        >
          <div className={clsx(styles.toggle)}>
            <div
              className={clsx(
                styles.toggleLeft,
                'absolute top-0 translate-x-[-200%] w-1/2 h-full transition-all duration-[600ms] ease-in-out flex flex-col justify-center items-center px-[30px] text-white'
              )}
            >
              <h1 className='text-[32px] font-semibol'>Welcome Back!</h1>
              <p className='text-center text-[14px] mt-5 mb-[30px] font-light'>
                Enter your personal details to sign up
              </p>
              <Button
                onClick={handleSwitchSignIn}
                textColor='white'
                borderColor='white'
                outlined
                primary
                rounded
              >
                Sign In
              </Button>
            </div>
            <div
              className={clsx(
                styles.toggleRight,
                'absolute top-0 translate-x-full w-1/2 h-full transition-all duration-[600ms] ease-in-out flex flex-col justify-center items-center px-[30px] text-white'
              )}
            >
              <h1 className='text-[32px] font-semibol'>Hello Friend!</h1>
              <p className='text-center text-[14px] mt-5 mb-[30px] font-light'>
                Enter your email and password to use all of site features
              </p>
              <Button
                onClick={handleSwitchSignUp}
                textColor='white'
                borderColor='white'
                outlined
                primary
                rounded
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
