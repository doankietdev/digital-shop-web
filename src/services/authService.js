import axios from '~/config/axiosClient'
import { signInApi, signOutApi, signUpApi } from '~/apis/authApis'

const signUp = async (data) => {
  return await axios.post(signUpApi, data)
}

const signIn = async (data) => {
  return await axios.post(signInApi, data)
}

const signOut = async () => {
  return await axios.post(signOutApi)
}

export default { signUp, signIn, signOut }
