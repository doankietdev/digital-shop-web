import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import {
  Button,
  CheckboxV2,
  Loading,
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

function UpdateAddress({ addressId, onClose }) {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  const districtsSelectorRef = useRef()
  const wardsSelectorRef = useRef()

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
          return value === null || value.length === 0 || value.length >= 2
        }
      )
      .nullable(),
    setAsDefault: yup.boolean().required()
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting }
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

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true)
        const [provinces, address] = await Promise.all([
          getProvinces(),
          addressService.getUserAddress(addressId)
        ])
        const districts = await getDistricts(address.province.id)
        const wards = await getWards(address.district.id)

        setProvinces(provinces)
        setDistricts(districts)
        setWards(wards)
        setAddress(address)

        setValue('provinceId', address.province.id)
        setValue('districtId', address.district.id)
        setValue('wardCode', address.ward.code)
        setValue('streetAddress', address.streetAddress)
        setValue('setAsDefault', !!address.default)
      } catch (error) {
        // do something
      } finally {
        setLoading(false)
      }
    }
    fetchProvinces()
  }, [addressId, setValue])

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        addressService.updateAddressForCurrentUser(addressId, data),
        {
          pending: {
            render() {
              return 'Updating address...'
            }
          },
          success: {
            render() {
              onClose()
              return 'Update address successfully'
            }
          },
          error: {
            render({ data }) {
              return data.messages[0]
            }
          }
        }
      )
      await dispatch(getCurrentUser()).unwrap()
    } catch (error) {
      // do something
    }
  }

  const handleSelectProvince = useCallback(
    async (id) => {
      setDistricts(await getDistricts(id))
      setWards([])
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
      <h3 className="pb-6 border-b font-semibold">Update Address</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 pt-6 flex flex-col"
      >
        <div
          className={clsx('flex-1 flex flex-col gap-5 border-b', {
            'justify-center items-center': loading
          })}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="flex justify-between gap-3">
                <SelectorOutlined
                  label="Province"
                  items={provinces.map((province) => ({
                    id: province.id,
                    name: province.name
                  }))}
                  defaultId={address?.province.id}
                  errorMessage={errors.provinceId?.message}
                  {...register('province')}
                  disabled={isSubmitting}
                  onSelect={handleSelectProvince}
                />
                <SelectorOutlined
                  label="District"
                  disabled={!districts?.length || isSubmitting}
                  items={districts?.map((district) => ({
                    id: district.id,
                    name: district.name
                  }))}
                  defaultId={address?.district.id}
                  ref={districtsSelectorRef}
                  errorMessage={errors.districtId?.message}
                  {...register('district')}
                  onSelect={handleSelectDistrict}
                />
                <SelectorOutlined
                  label="Ward"
                  disabled={!wards?.length || isSubmitting}
                  items={wards?.map((ward) => ({
                    id: ward.code,
                    name: ward.name
                  }))}
                  defaultId={address?.ward.code}
                  ref={wardsSelectorRef}
                  errorMessage={errors.wardCode?.message}
                  {...register('ward')}
                  onSelect={handleSelectWard}
                />
              </div>
              <div>
                <TextFieldOutlined
                  label="Specific Address"
                  defaultValue={address?.streetAddress}
                  errorMessage={errors?.streetAddress?.message}
                  disabled={isSubmitting}
                  {...register('streetAddress', {
                    setValueAs: (value) => (value === '' ? null : value)
                  })}
                />
              </div>
              <div className="flex items-center gap-1">
                <CheckboxV2
                  id="setAsDefaultCheckbox"
                  defaultChecked={address?.default}
                  disabled={isSubmitting}
                  {...register('setAsDefault')}
                />
                <label
                  htmlFor="setAsDefaultCheckbox"
                  className="pl-1 text-[14px] text-black/60 select-none"
                >
                  Set as default
                </label>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end gap-3 pt-6">
          <Button
            primary
            outlined
            rounded
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            primary
            rounded
            disabled={loading || isSubmitting}
          >
            Complete
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateAddress
