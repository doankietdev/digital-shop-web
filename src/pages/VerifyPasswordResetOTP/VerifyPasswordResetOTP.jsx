import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import otpIcon from '~/assets/otp-icon.png'
import { Button, Card, Loading, OTPField } from '~/components'
import { routesConfig } from '~/config'
import authService from '~/services/authService'
import { GrSendIcon } from '~/utils/icons'

function VerifyPasswordResetOTP() {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const handleCompletedOTP = useCallback((otp) => {
    setOtp(otp)
    setDisabled(false)
  }, [])

  const handleUnCompleteOTP = useCallback(() => {
    setOtp('')
    setDisabled(true)
  }, [])

  const handleSend = useCallback(async () => {
    try {
      setLoading(true)
      await authService.verifyPasswordResetOtp({
        otp
      })
      navigate(routesConfig.resetPassword)
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setLoading(false)
    }
  }, [navigate, otp])

  const handleResendOtp = useCallback(async () => {
    try {
      setLoading(true)
      await authService.resendPasswordResetOtp()
      toast.success('OTP has been resent to your email.')
    } catch (error) {
      toast.error('Resend OTP failed')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div
      className={clsx('flex justify-center items-center h-screen bg-secondary-400')}
    >
      <Card className='animate-fadeIn !min-w-0 w-[520px] shadow-none'>
        <div className='flex flex-col justify-center items-center p-[44px] relative'>
          <h2 className='text-[23px] tracking-[2px] font-semibold'>
            Verify OTP
          </h2>
          <img src={otpIcon} className='w-[100px] h-[100px] object-contain' />
          <p className='text-[14px] text-center opacity-60 font-medium'>
            OTP code has been sent to your email. Please check your email and
            enter OTP code below.
          </p>
          <OTPField
            onComplete={handleCompletedOTP}
            onUnComplete={handleUnCompleteOTP}
            className='mt-4 text-[14px]'
            outlined
            rounded
          />
          <div className='mt-5 w-full flex justify-center items-center'>
            <Button
              className={clsx(
                {
                  'hover:!bg-secondary-200': !disabled
                },
                '!bg-secondary-400 w-full py-[15px]'
              )}
              type='submit'
              startIcon={<GrSendIcon className='text-[18px]' />}
              rounded
              disabled={disabled}
              onClick={handleSend}
            >
              Send
            </Button>
          </div>

          <div className='mt-6 text-[14px] font-semibold'>
            <span className='mr-1'>Didn&apos;t receive OTP?</span>
            <span className='p-[6px] text-secondary-400 hover:text-secondary-200 cursor-pointer' onClick={handleResendOtp}>
              Resend OTP
            </span>
          </div>
          {loading && <Loading className='absolute bottom-[-12px]' />}
        </div>
      </Card>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default VerifyPasswordResetOTP
