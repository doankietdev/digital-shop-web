import { StatusCodes } from 'http-status-codes'
import axios from '~/config/axiosClient'
import { signInApi, signOutApi, signUpApi } from '~/apis/authApis'
import { parseResponseMessage } from '~/utils/formatter'
import UIError from '~/utils/UIError'

const signUp = async (data) => {
  try {
    const { message } = await axios.post(signUpApi, data)
    return {
      message
    }
  } catch (error) {
    if (error.statusCode === StatusCodes.CONFLICT) {
      return Promise.reject(new UIError(parseResponseMessage(error.message)))
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
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export default { signUp, signIn, signOut }
