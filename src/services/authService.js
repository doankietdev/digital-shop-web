import { StatusCodes } from 'http-status-codes'
import axios from '~/config/axiosClient'
import { signInApi, signOutApi, signUpApi } from '~/apis/authApis'
import { parseResponseMessage } from '~/utils/formatter'
import UIError from '~/utils/UIError'

const signUp = async (data) => {
  try {
    return await axios.post(signUpApi, data)
  } catch (error) {
    if (error.statusCode === StatusCodes.CONFLICT) {
      return Promise.reject(new UIError(parseResponseMessage(error.message)))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const signIn = async (data) => {
  try {
    return await axios.post(signInApi, data)
  } catch (error) {
    if (error.statusCode === StatusCodes.UNAUTHORIZED) {
      return Promise.reject(new UIError(['Invalid email or password']))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const signOut = async () => {
  try {
    return await axios.post(signOutApi)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

export default { signUp, signIn, signOut }
