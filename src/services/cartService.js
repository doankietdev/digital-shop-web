import { StatusCodes } from 'http-status-codes'
import apis from '~/apis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const {
  addProductsToCartApi,
  addToCartApi,
  deleteFromCartApi,
  getCartApi,
  updateProductQuantityApi,
  updateVariantApi
} = apis

const addToCart = async ({ productId, variantId, quantity }) => {
  try {
    const { metadata } = await axiosClient.post(addToCartApi, {
      productId,
      quantity,
      variantId
    })
    return metadata.cart
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

/**
 *
 * @param {[{
 *  productId,
 *  variantId,
 *  quantity
 * }]} products
 * @returns
 */

const addProductsToCart = async (products) => {
  try {
    const { metadata } = await axiosClient.post(addProductsToCartApi, {
      products
    })
    return metadata.cart
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const updateVariant = async ({ productId, oldVariantId, variantId }) => {
  try {
    const { metadata } = await axiosClient.post(updateVariantApi, {
      productId,
      oldVariantId,
      variantId
    })
    return metadata.cart
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const updateProductQuantity = async ({
  productId,
  variantId,
  quantity,
  oldQuantity
}) => {
  try {
    const { metadata } = await axiosClient.post(updateProductQuantityApi, {
      productId,
      variantId,
      quantity,
      oldQuantity
    })
    return metadata.cart
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const getCart = async () => {
  try {
    const { metadata } = await axiosClient.get(getCartApi)
    return metadata.cart
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

/**
 * @param {[{
 *   productId: string,
 *   variantId: string
 * }]} products
 * @returns {Promise<object>}
 */
const deleteFromCart = async (products) => {
  try {
    const { metadata } = await axiosClient.post(deleteFromCartApi, {
      products
    })
    return metadata.cart
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      return Promise.reject(new UIError([error.message]))
    }
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export default {
  addToCart,
  addProductsToCart,
  updateVariant,
  updateProductQuantity,
  getCart,
  deleteFromCart
}
