import { StatusCodes } from 'http-status-codes'
import apis from '~/apis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const { changePasswordApi, getCurrentUserApi, setDefaultAddressApi, updateCurrentUserApi, uploadAvatarApi } = apis

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

const uploadAvatar = async (formData) => {
  try {
    const { metadata } = await axiosClient.patch(uploadAvatarApi, formData)
    return metadata.user
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const updateCurrentUser = async (data = {}) => {
  const { metadata } = await axiosClient.patch(updateCurrentUserApi, data)
  return metadata
}

const changePassword = async (data = {}) => {
  try {
    await axiosClient.patch(changePasswordApi, data)
  } catch (error) {
    if (
      error.statusCode === StatusCodes.BAD_REQUEST
      || error.statusCode === StatusCodes.CONFLICT
    ) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export default {
  getCurrentUser,
  setDefaultAddress,
  uploadAvatar,
  updateCurrentUser,
  changePassword
}
