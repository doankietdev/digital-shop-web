import {
  createNewAddressApi,
  getUserAddressApi,
  getUserAddressesApi,
  updateAddressForCurrentUserApi
} from '~/apis/addressApis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'
import { parsePlaceHolderUrl } from '~/utils/formatter'

const createNewAddress = async ({
  provinceId,
  districtId,
  wardCode,
  streetAddress,
  setAsDefault
}) => {
  try {
    const { metadata } = await axiosClient.post(createNewAddressApi, {
      provinceId,
      districtId,
      wardCode,
      streetAddress,
      setAsDefault
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const getUserAddresses = async () => {
  try {
    const { metadata } = await axiosClient.get(getUserAddressesApi)
    return metadata.addresses
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const getUserAddress = async (addressId) => {
  try {
    const { metadata } = await axiosClient.get(
      parsePlaceHolderUrl(getUserAddressApi, {
        addressId
      })
    )
    return metadata.address
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const updateAddressForCurrentUser = async (
  addressId,
  { provinceId, districtId, wardCode, streetAddress, setAsDefault }
) => {
  try {
    const { metadata } = await axiosClient.patch(
      parsePlaceHolderUrl(updateAddressForCurrentUserApi, {
        addressId
      }),
      { provinceId, districtId, wardCode, streetAddress, setAsDefault }
    )
    return metadata.address
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export default {
  createNewAddress,
  getUserAddresses,
  getUserAddress,
  updateAddressForCurrentUser
}
