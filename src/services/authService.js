import { StatusCodes } from 'http-status-codes'
import {
  checkSignInStatusApi,
  forgotPasswordApi,
  signInWithGoogleApi,
  refreshTokenApi,
  resendPasswordResetOtpApi,
  resetPasswordApi,
  signInApi,
  signOutApi,
  signUpApi,
  verifyAccountApi,
  verifyPasswordResetOtpApi
} from '~/apis/authApis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const signUp = async (data) => {
  const { metadata } = await axiosClient.post(signUpApi, data)
  return metadata
}

const signIn = async (data) => {
  const { metadata } = await axiosClient.post(signInApi, data)
  return metadata
}

const signOut = async () => {
  const { metadata } = await axiosClient.delete(signOutApi)
  return metadata
}

const verifyAccount = async ({ email, token }) => {
  const { metadata } = await axiosClient.post(verifyAccountApi, { email, token })
  return metadata
}

const forgotPassword = async ({ email }) => {
  const { metadata } = await axiosClient.post(forgotPasswordApi, { email })
  return metadata
}

const verifyPasswordResetOtp = async ({ email, otp }) => {
  const { metadata } = await axiosClient.post(verifyPasswordResetOtpApi, {
    email,
    otp
  })
  return metadata
}

const resetPassword = async ({ email, newPassword }) => {
  await axiosClient.post(resetPasswordApi, {
    email,
    newPassword
  })
}

const resendPasswordResetOtp = async () => {
  try {
    const { message } = await axiosClient.post(resendPasswordResetOtpApi)
    return { message }
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST || error.statusCode === StatusCodes.CONFLICT) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const checkSignInStatus = async () => {
  const { metadata } = await axiosClient.get(checkSignInStatusApi)
  return metadata
}

const refreshToken = async ({ refreshToken }) => {
  const { metadata } = await axiosClient.put(refreshTokenApi, { refreshToken })
  return metadata
}

const signInWithGoogle = async ({ code }) => {
  const { metadata } = await axiosClient.post(signInWithGoogleApi, { code })
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
  refreshToken,
  signInWithGoogle
}
