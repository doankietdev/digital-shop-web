import { StatusCodes } from 'http-status-codes'
import apis from '~/apis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'
import { currencyMap } from '~/utils/constants'
import { parsePlaceHolderUrl } from '~/utils/formatter'

const language = localStorage.getItem('language') || 'vi'

const currency = currencyMap[language]

const { getOrderOfCurrentUserApi, getOrdersOfCurrentUserApi, updateShippingAddressOfCurrentUserApi } = apis

/**
 *
 * @param {{
 *  paymentMethod: string,
 *  shippingAddress: string,
 *  shippingFee: number,
 *  status: string,
 *  _page: number,
 *  _limit: number
 * }} params
 * @returns
 */
const getOrdersOfCurrentUser = async params => {
  try {
    const { metadata } = await axiosClient.get(getOrdersOfCurrentUserApi, {
      params: {
        ...params,
        _sort: '-updatedAt',
        _currency: currency
      }
    })
    return metadata
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const getOrderOfCurrentUser = async orderId => {
  try {
    const { metadata } = await axiosClient.get(
      parsePlaceHolderUrl(getOrderOfCurrentUserApi, {
        orderId
      }),
      {
        params: { _currency: currency }
      }
    )
    return metadata.order
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const updateShippingAddressOfCurrentUser = async ({ orderId, addressId }) => {
  try {
    const { metadata } = await axiosClient.patch(
      parsePlaceHolderUrl(
        updateShippingAddressOfCurrentUserApi,
        {
          orderId
        }
      ),
      { addressId }
    )
    return metadata.order
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export default {
  getOrdersOfCurrentUser,
  getOrderOfCurrentUser,
  updateShippingAddressOfCurrentUser
}
