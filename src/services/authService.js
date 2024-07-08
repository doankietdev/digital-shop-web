import { StatusCodes } from 'http-status-codes'
import {
  forgotPasswordApi,
  resendPasswordResetOtpApi,
  resetPasswordApi,
  signInApi,
  signOutApi,
  signUpApi,
  verifyEmailApi,
  verifyPasswordResetOtpApi
} from '~/apis/authApis'
import axios from '~/config/axiosClient'
import UIError from '~/utils/UIError'
import { parseResponseMessage } from '~/utils/formatter'

const signUp = async (data) => {
  try {
    const { message } = await axios.post(signUpApi, data)
    return {
      message
    }
  } catch (error) {
    if (error.statusCode === StatusCodes.CONFLICT) {
      return Promise.reject(new UIError(parseResponseMessage(error.message), StatusCodes.CONFLICT))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const signIn = async (data) => {
  try {
    const { metadata } = await axios.post(signInApi, data)
    return metadata
  } catch (error) {
    if (error.statusCode === StatusCodes.UNAUTHORIZED) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const signOut = async () => {
  try {
    const { metadata } = await axios.post(signOutApi)
    return metadata
  } catch (error) {
    if (error.statusCode === StatusCodes.UNAUTHORIZED) {
      return
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const verifyEmail = async ({ userId, token }) => {
  try {
    const { message } = await axios.post(verifyEmailApi, { userId, token })
    return {
      message
    }
  } catch (error) {
    if (
      error.statusCode === StatusCodes.BAD_REQUEST ||
      error.statusCode === StatusCodes.NOT_FOUND
    ) {
      return Promise.reject(new UIError(['Not found']))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const forgotPassword = async ({ email }) => {
  try {
    const { metadata } = await axios.post(forgotPasswordApi, { email })
    return metadata
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const verifyPasswordResetOtp = async ({ otp }) => {
  try {
    const { metadata } = await axios.post(verifyPasswordResetOtpApi, {
      otp
    })
    return metadata
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const resetPassword = async ({ newPassword }) => {
  try {
    const { message } = await axios.post(resetPasswordApi, {
      newPassword
    })
    return { message }
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST || error.statusCode === StatusCodes.CONFLICT) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
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

export default {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  forgotPassword,
  verifyPasswordResetOtp,
  resetPassword,
  resendPasswordResetOtp
}
