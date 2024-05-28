import { reviewOrderApi } from '~/apis/checkoutApis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

// {
//   productId,
//   variantId,
//   oldPrice,
//   price,
//   quantity
// }

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
    const { metadata } = await axiosClient.post(reviewOrderApi, {
      orderProducts
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export { reviewOrder }
