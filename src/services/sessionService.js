import apis from '~/apis'
import axiosClient from '~/config/axiosClient'

const {
  getLoginSessionForCurrentApi,
  logoutSessionForCurrentApi
} = apis

const getLoginSessionForCurrent = async () => {
  const { metadata } = await axiosClient.get(getLoginSessionForCurrentApi)
  return metadata.loginSessions
}

const logoutSessionForCurrent = async ({ loginSessionId }) => {
  await axiosClient.post(logoutSessionForCurrentApi, { loginSessionId })
}

export default {
  getLoginSessionForCurrent,
  logoutSessionForCurrent
}
