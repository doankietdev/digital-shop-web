import request from '~/utils/request'
import { signUpApi } from '~/apis/authApis'

const signUp = async (data) => {
  return await request.post(signUpApi, data)
}

export default { signUp }
