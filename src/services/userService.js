import { getCurrentUserApi, setDefaultAddressApi } from '~/apis/userApis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const getCurrentUser = async (params) => {
  try {
    const { metadata } = await axiosClient.get(getCurrentUserApi, {
      params
    })
    return metadata.user
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const setDefaultAddress = async (addressId) => {
  try {
    const { metadata } = await axiosClient.post(setDefaultAddressApi, {
      addressId
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export default {
  getCurrentUser,
  setDefaultAddress
}
