import { StatusCodes } from 'http-status-codes'
import {
  checkSignInStatusApi,
  forgotPasswordApi,
  refreshTokenApi,
  resendPasswordResetOtpApi,
  resetPasswordApi,
  signInApi,
  signOutApi,
  signUpApi,
  verifyAccountApi,
  verifyPasswordResetOtpApi
} from '~/apis/authApis'
import axios from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const signUp = async (data) => {
  const { metadata } = await axios.post(signUpApi, data)
  return metadata
}

const signIn = async (data) => {
  const { metadata } = await axios.post(signInApi, data)
  return metadata
}

const signOut = async () => {
  const { metadata } = await axios.delete(signOutApi)
  return metadata
}

const verifyAccount = async ({ email, token }) => {
  const { metadata } = await axios.post(verifyAccountApi, { email, token })
  return metadata
}

const forgotPassword = async ({ email }) => {
  const { metadata } = await axios.post(forgotPasswordApi, { email })
  return metadata
}

const verifyPasswordResetOtp = async ({ email, otp }) => {
  const { metadata } = await axios.post(verifyPasswordResetOtpApi, {
    email,
    otp
  })
  return metadata
}

const resetPassword = async ({ email, newPassword }) => {
  await axios.post(resetPasswordApi, {
    email,
    newPassword
  })
}

const resendPasswordResetOtp = async () => {
  try {
    const { message } = await axios.post(resendPasswordResetOtpApi)
    return { message }
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST || error.statusCode === StatusCodes.CONFLICT) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const checkSignInStatus = async () => {
  const { metadata } = await axios.get(checkSignInStatusApi)
  return metadata
}

const refreshToken = async ({ refreshToken }) => {
  const { metadata } = await axios.put(refreshTokenApi, { refreshToken })
  return metadata
}

export default {
  signUp,
  signIn,
  signOut,
  verifyAccount,
  forgotPassword,
  verifyPasswordResetOtp,
  resetPassword,
  resendPasswordResetOtp,
  checkSignInStatus,
  refreshToken
}
