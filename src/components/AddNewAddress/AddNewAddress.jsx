import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import {
  Button,
  CheckboxV2,
  SelectorOutlined,
  TextFieldOutlined
} from '~/components'
import { getCurrentUser } from '~/pages/Auth/AuthSlice'
import { dispatch } from '~/redux'
import addressService from '~/services/addressService'
import {
  getDistricts,
  getProvinces,
  getWards
} from '~/services/locationService'

function AddNewAddress({ onClose = () => {}, onSuccess = async () => {} }) {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const districtsSelectorRef = useRef()
  const wardsSelectorRef = useRef()

  useEffect(() => {
    const fetchProvinces = async () => {
      setProvinces(await getProvinces())
    }
    fetchProvinces()
  }, [])

  const schema = yup.object({
    provinceId: yup.number().required('Please select province'),
    districtId: yup.number().required('Please select district'),
    wardCode: yup.string().required('Please select ward'),
    streetAddress: yup
      .string()
      .test(
        'is-valid-length',
        'Please enter at least 2 characters',
        (value) => {
          return value === null || value?.length === 0 || value?.length >= 2
        }
      ).nullable(),
    setAsDefault: yup.boolean().required()
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      provinceId: null,
      districtId: null,
      wardCode: null,
      streetAddress: null,
      setAsDefault: false
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Adding new address...')
    try {
      await addressService.createNewAddress(data)
      await dispatch(getCurrentUser()).unwrap()
      onClose()
      await onSuccess()
      toast.success('Add new address successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  const handleSelectProvince = useCallback(
    async (id) => {
      setDistricts(await getDistricts(id))
      setWards([])
      districtsSelectorRef.current?.reset()
      wardsSelectorRef.current?.reset()
      setValue('provinceId', id)
    },
    [setValue]
  )

  const handleSelectDistrict = useCallback(
    async (id) => {
      setWards(await getWards(id))
      wardsSelectorRef.current?.reset()
      setValue('districtId', id)
    },
    [setValue]
  )

  const handleSelectWard = useCallback(
    async (id) => {
      setValue('wardCode', id)
    },
    [setValue]
  )

  return (
    <div className="w-full min-h-[400px] flex flex-col">
      <h3 className="pb-6 border-b font-semibold">Add New Address</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 pt-6 flex flex-col"
      >
        <div className="flex-1 flex flex-col gap-5 border-b">
          <div className="flex justify-between gap-3">
            <SelectorOutlined
              label="Province"
              items={provinces.map((province) => ({
                id: province.id,
                name: province.name
              }))}
              errorMessage={errors.provinceId?.message}
              {...register('province')}
              onSelect={handleSelectProvince}
            />
            <SelectorOutlined
              label="District"
              disabled={!districts.length}
              items={districts.map((district) => ({
                id: district.id,
                name: district.name
              }))}
              ref={districtsSelectorRef}
              errorMessage={errors.districtId?.message}
              {...register('district')}
              onSelect={handleSelectDistrict}
            />
            <SelectorOutlined
              label="Ward"
              disabled={!wards.length}
              items={wards.map((ward) => ({
                id: ward.code,
                name: ward.name
              }))}
              ref={wardsSelectorRef}
              errorMessage={errors.wardCode?.message}
              {...register('ward')}
              onSelect={handleSelectWard}
            />
          </div>
          <div>
            <TextFieldOutlined
              label="Specific Address"
              errorMessage={errors?.streetAddress?.message}
              {...register('streetAddress', {
                setValueAs: (value) => (value === '' ? null : value)
              })}
            />
          </div>
          <div className="flex items-center gap-1">
            <CheckboxV2
              id="setAsDefaultCheckbox"
              {...register('setAsDefault')}
            />
            <label
              htmlFor="setAsDefaultCheckbox"
              className="pl-1 text-[14px] text-black/60 select-none"
            >
              Set as default
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-6">
          <Button primary outlined rounded onClick={onClose}>
            Cancel
          </Button>
          <Button primary rounded type="submit">
            Complete
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddNewAddress
