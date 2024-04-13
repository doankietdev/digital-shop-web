import request from '~/utils/request'
import { signInApi, signUpApi } from '~/apis/authApis'

const signUp = async (data) => {
  return await request.post(signUpApi, data)
}

const signIn = async (data) => {
  return await request.post(signInApi, data)
}

export default { signUp, signIn }
