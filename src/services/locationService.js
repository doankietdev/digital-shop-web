import {
  getDistrictsApi,
  getProvincesApi,
  getWardsApi
} from '~/apis/locationApis'
import axiosClient from '~/config/axiosClient'
import UIError from '~/utils/UIError'

const getProvinces = async (params) => {
  try {
    const { metadata } = await axiosClient.get(getProvincesApi, {
      params
    })
    return metadata.provinces
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const getDistricts = async (provinceId, params) => {
  try {
    const { metadata } = await axiosClient.get(getDistrictsApi, {
      params: {
        ...params,
        provinceId
      }
    })
    return metadata.districts
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

const getWards = async (districtId, params) => {
  try {
    const { metadata } = await axiosClient.get(getWardsApi, {
      params: {
        ...params,
        districtId
      }
    })
    return metadata.wards
  } catch (error) {
    return Promise.reject(new UIError(['Something went wrong']))
  }
}

export { getProvinces, getDistricts, getWards }
