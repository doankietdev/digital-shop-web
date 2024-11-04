import apis from '~/apis'
import axiosClient from '~/config/axiosClient'

const {
  getLoginSessionsForCurrentApi,
  logoutSessionForCurrentApi,
  logoutAllSessionsForCurrentApi
} = apis

const getLoginSessionsForCurrent = async () => {
  const { metadata } = await axiosClient.get(getLoginSessionsForCurrentApi)
  return metadata.loginSessions
}

const logoutSessionForCurrent = async ({ loginSessionId }) => {
  await axiosClient.post(logoutSessionForCurrentApi, { loginSessionId })
}

const logoutAllSessionsForCurrent = async () => {
  await axiosClient.post(logoutAllSessionsForCurrentApi)
}

export default {
  getLoginSessionsForCurrent,
  logoutSessionForCurrent,
  logoutAllSessionsForCurrent
}
