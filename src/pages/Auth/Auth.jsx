import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Button, DocumentTitle } from '~/components'
import { routesConfig } from '~/config'
import { userSelector } from '~/redux/selectors'
import { dispatch } from '~/redux/store'
import styles from './Auth.module.css'
import { signIn, signUp } from './AuthSlice'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import authBackground from '~/assets/auth-background.jpg'
import logoImage from '~/assets/logo.png'
import { StorageKeys } from '~/utils/constants'

function Auth() {
  const [headTitle, setHeadTitle] = useState('Sign In')
  const container = useRef(null)
  const signUpFormRef = useRef(null)
  const signInFormRef = useRef(null)
  const navigate = useNavigate()
  const user = useSelector(userSelector)

  const [signUpErrors, setSignUpErrors] = useState([])

  useEffect(() => {
    if (user?.current?._id) {
      navigate(routesConfig.home)
    }
  }, [navigate, user])

  useEffect(() => {
    const isResetPasswordSuccess = sessionStorage.getItem(
      StorageKeys.IS_RESET_PASSWORD_SUCCESS
    )
    sessionStorage.removeItem(StorageKeys.IS_RESET_PASSWORD_SUCCESS)
    if (isResetPasswordSuccess) toast.success('Reset password successfully')
  }, [])

  const handleSwitchSignUp = () => {
    setHeadTitle('Sign Up')
    container.current.classList.add(styles.active)
    signInFormRef.current.reset()
  }

  const handleSwitchSignIn = () => {
    setHeadTitle('Sign In')
    container.current.classList.remove(styles.active)
    signUpFormRef.current.reset()
  }

  const handleSignUp = useCallback(async (data) => {
    try {
      const { message } = await dispatch(signUp(data)).unwrap()
      toast.success(message, { autoClose: 5000 })
      signUpFormRef.current.reset()
      handleSwitchSignIn()
    } catch (error) {
      setSignUpErrors(error.messages)
    }
  }, [])

  const handleSignIn = useCallback(
    async (data) => {
      try {
        await dispatch(signIn(data)).unwrap()
        sessionStorage.setItem('signIn', true)
        navigate(routesConfig.home)
      } catch (error) {
        toast.error(error.messages[0], { autoClose: 5000 })
        signInFormRef.current.reset()
      }
    },
    [navigate]
  )

  return (
    <>
      <DocumentTitle title={headTitle} />
      {
        <div
          style={{
            backgroundImage: `url(${authBackground})`
          }}
          className={clsx(
            'flex justify-center items-center h-screen bg-cover bg-no-repeat'
          )}
        >
          <div
            className={clsx(
              styles.container,
              'animate-fadeIn relative bg-transparent backdrop-blur-lg w-[800px] max-w-full min-h-[680px] rounded-[30px] text-white overflow-hidden'
            )}
            ref={container}
          >
            <div
              className={clsx(
                styles.signUp,
                'absolute top-0 left-0 h-full opacity-0 z-[1] transition-all duration-[600ms] ease-in-out w-1/2'
              )}
            >
              <SignUpForm
                ref={signUpFormRef}
                errors={signUpErrors}
                onSubmit={handleSignUp}
              />
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
                  <Link
                    to={routesConfig.home}
                    title='Back to home'
                    className='absolute top-[100px]'
                  >
                    <img
                      src={logoImage}
                      alt='Logo'
                      className='w-[240px] object-contain'
                    />
                  </Link>
                  <h1 className='mt-3 text-[32px] font-medium tracking-[2px]'>
                    Welcome Back!
                  </h1>
                  <p className='tracking-[1px] text-center text-[12px] mt-5 mb-[30px] font-light'>
                    Enter your personal details to sign up
                  </p>
                  <Button
                    onClick={handleSwitchSignIn}
                    className='text-white border-white'
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
                  <Link
                    to={routesConfig.home}
                    title='Back to home'
                    className='absolute top-[100px]'
                  >
                    <img
                      src={logoImage}
                      alt='Logo'
                      className='w-[240px] object-contain'
                    />
                  </Link>
                  <h1 className='tracking-[2px] text-[32px] font-medium'>
                    Hello Friend!
                  </h1>
                  <p className='tracking-[1px] text-center text-[12px] mt-5 mb-[30px] font-light'>
                    Enter your email and password to use all of site features
                  </p>
                  <Button
                    onClick={handleSwitchSignUp}
                    className='text-white border-white'
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
      }
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default Auth
