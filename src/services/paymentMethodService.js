import apis from '~/apis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const { getPaymentMethodsApi } = apis

const getPaymentMethods = async (params) => {
  try {
    const { metadata } = await axiosClient.get(getPaymentMethodsApi, {
      params
    })
    return metadata
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export default {
  getPaymentMethods
}
