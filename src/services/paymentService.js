import apis from '~/apis'
import { initMomoPaymentApi } from '~/apis/en'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const { createPayPalOrderApi, capturePayPalOrderApi } = apis

const createPayPalOrder = async (orderProducts) => {
  try {
    const { metadata } = await axiosClient.post(createPayPalOrderApi, {
      orderProducts
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError([error.message]))
  }
}

const capturePayPalOrder = async ({ paypalOrderId, orderProducts }) => {
  try {
    const { metadata } = await axiosClient.post(capturePayPalOrderApi, {
      paypalOrderId,
      orderProducts
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError([error.message]))
  }
}

const initMomoPayment = async (orderProducts) => {
  try {
    const { metadata } = await axiosClient.post(initMomoPaymentApi, {
      orderProducts
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError([error.message]))
  }
}

export default {
  createPayPalOrder,
  capturePayPalOrder,
  initMomoPayment
}
