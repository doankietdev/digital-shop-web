import request from '~/utils/request'
import { signInApi, signOutApi, signUpApi } from '~/apis/authApis'

const signUp = async (data) => {
  return await request.post(signUpApi, data)
}

const signIn = async (data) => {
  return await request.post(signInApi, data)
}

const signOut = async () => {
  return await request.post(signOutApi)
}

export default { signUp, signIn, signOut }
