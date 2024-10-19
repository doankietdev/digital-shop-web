import apis from '~/apis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'
import { parsePlaceHolderUrl } from '~/utils/formatter'

const {
  createNewAddressApi,
  getUserAddressesApi,
  getUserAddressApi,
  updateAddressForCurrentUserApi
} = apis

const createNewAddress = async ({
  firstName,
  lastName,
  phoneNumber,
  provinceId,
  districtId,
  wardCode,
  streetAddress,
  setAsDefault
}) => {
  const { metadata } = await axiosClient.post(createNewAddressApi, {
    firstName,
    lastName,
    phoneNumber,
    provinceId,
    districtId,
    wardCode,
    streetAddress,
    setAsDefault
  })
  return metadata
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
  { firstName, lastName, phoneNumber, provinceId, districtId, wardCode, streetAddress, setAsDefault }
) => {
  const { metadata } = await axiosClient.patch(
    parsePlaceHolderUrl(updateAddressForCurrentUserApi, {
      addressId
    }),
    { firstName, lastName, phoneNumber, provinceId, districtId, wardCode, streetAddress, setAsDefault }
  )
  return metadata.address
}

export default {
  createNewAddress,
  getUserAddresses,
  getUserAddress,
  updateAddressForCurrentUser
}
