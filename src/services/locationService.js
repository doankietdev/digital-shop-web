import {
  getDistrictsApi,
  getProvincesApi,
  getWardsApi
} from '~/apis/locationApis'
import axiosClient from '~/config/axiosClient'

const getProvinces = async (params) => {
  const { metadata } = await axiosClient.get(getProvincesApi, {
    params
  })
  return metadata.provinces
}

const getDistricts = async (provinceId, params) => {
  const { metadata } = await axiosClient.get(getDistrictsApi, {
    params: {
      ...params,
      provinceId
    }
  })
  return metadata.districts
}

const getWards = async (districtId, params) => {
  const { metadata } = await axiosClient.get(getWardsApi, {
    params: {
      ...params,
      districtId
    }
  })
  return metadata.wards
}

export { getDistricts, getProvinces, getWards }
