import apis from '~/apis'
import axiosClient from '~/config/axiosClient'
import { currencyMap } from '~/utils/constants'
import UIError from '~/utils/UIError'

const language = localStorage.getItem('language') || 'vi'

const currency = currencyMap[language]

const { cancelOrderApi, orderApi, reviewOrderApi } = apis

/**
 * @param {[{
 *   productId: string,
 *   variantId: string,
 *   oldPrice: number,
 *   price: number,
 *   quantity: number,
 * }]} orderProducts
 * @returns {Promise<object>}
 */
const reviewOrder = async (orderProducts) => {
  try {
    const { metadata } = await axiosClient.post(`${reviewOrderApi}?_currency=${currency}`, {
      orderProducts
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

/**
 * @param {[{
 *   productId: string,
 *   variantId: string,
 *   oldPrice: number,
 *   price: number,
 *   quantity: number,
 * }]} orderProducts
 * @param {string} paymentMethod
 * @returns {Promise<object>}
 */
const order = async (orderProducts, paymentMethod) => {
  try {
    const { metadata } = await axiosClient.post(orderApi, {
      orderProducts,
      paymentMethod
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError([error.message]))
  }
}

const cancelOrder = async (orderId) => {
  try {
    await axiosClient.patch(cancelOrderApi, {}, {
      params: {
        orderId
      }
    })
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export { reviewOrder, order, cancelOrder }
