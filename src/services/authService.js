import { StatusCodes } from 'http-status-codes'
import axios from '~/config/axiosClient'
import { signInApi, signOutApi, signUpApi } from '~/apis/authApis'
import { parseResponseMessage } from '~/utils/formatter'

const signUp = async (data) => {
  try {
    return await axios.post(signUpApi, data)
  } catch (error) {
    if (error.statusCode === StatusCodes.CONFLICT) {
      return Promise.reject(parseResponseMessage(error.message))
    }
    throw new Error('Something went wrong')
  }
}

const signIn = async (data) => {
  try {
    return await axios.post(signInApi, data)
  } catch (error) {
    if (error.statusCode === StatusCodes.UNAUTHORIZED) {
      throw new Error('Invalid email or password')
    }
    throw new Error('Something went wrong')
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
