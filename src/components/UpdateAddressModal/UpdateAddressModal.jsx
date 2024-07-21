/* eslint-disable react-refresh/only-export-components */
import { yupResolver } from '@hookform/resolvers/yup'
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { CheckboxV2, Modal, SelectorOutlined, TextFieldOutlined } from '~/components'
import { getCurrentUser } from '~/pages/Auth/AuthSlice'
import { dispatch } from '~/redux'
import addressService from '~/services/addressService'
import { getDistricts, getProvinces, getWards } from '~/services/locationService'

function UpdateAddressModal({
  address,
  onSuccess = () => {},
  onClose = () => {}
}, ref) {
  const modalRef = useRef()
  const submitButtonRef = useRef()

  useImperativeHandle(ref, () => ({
    ...modalRef.current
  }))

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [provincesLoading, setProvincesLoading] = useState(false)
  const [districtsLoading, setDistrictsLoading] = useState(false)
  const [wardsLoading, setWardsLoading] = useState(false)

  const provincesSelectorRef = useRef()
  const districtsSelectorRef = useRef()
  const wardsSelectorRef = useRef()

  const schema = yup.object({
    firstName: yup.string().required('Please enter first name').min(1, 'First name must have at least 1 characters'),
    lastName: yup.string().required('Please enter last name').min(2, 'Last name must have at least 2 characters'),
    phoneNumber: yup
      .string()
      .required('Please enter phone number')
      .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    provinceId: yup.string().required('Please select province'),
    districtId: yup.string().required('Please select district'),
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
    getValues,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    values: {
      firstName: address?.firstName,
      lastName: address?.lastName,
      phoneNumber: address?.phoneNumber,
      provinceId: address?.province?.id,
      districtId: address?.district?.id,
      wardCode: address?.ward?.code,
      streetAddress: address?.streetAddress,
      setAsDefault: address?.default
    },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setProvincesLoading(true)
        setDistrictsLoading(true)
        setWardsLoading(true)
        const provinces = await getProvinces()
        const districts = await getDistricts(address.province.id)
        const wards = await getWards(address.district.id)

        setProvinces(provinces)
        setDistricts(districts)
        setWards(wards)
      } catch (error) {
        toast.error('Cannot update address!')
        modalRef.current.hide()
      } finally {
        setProvincesLoading(false)
        setDistrictsLoading(false)
        setWardsLoading(false)
      }
    }
    if (address) {
      fetchLocations()
    }
  }, [address])

  const onSubmit = useCallback(async (data) => {
    const loadingToast = toast.loading('Updating address...')
    try {
      await addressService.updateAddressForCurrentUser(address._id, data)
      await dispatch(getCurrentUser()).unwrap()
      onSuccess()
      toast.success('Update address successfully')
      modalRef.current.hide()
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.dismiss(loadingToast)
    }
  }, [address._id, onSuccess])

  const handleSelectProvince = useCallback(
    async (id) => {
      try {
        clearErrors('provinceId')
        setDistrictsLoading(true)
        setDistricts(await getDistricts(id))
        setWards([])
        districtsSelectorRef.current?.reset()
        wardsSelectorRef.current?.reset()

        setValue('provinceId', id)
        setValue('districtId', '')
        setValue('wardCode', '')
      } catch (error) {
        modalRef.current.hide()
        toast.error(error.message)
      } finally {
        setDistrictsLoading(false)
      }
    },
    [clearErrors, setValue]
  )

  const handleSelectDistrict = useCallback(
    async (id) => {
      try {
        clearErrors('districtId')
        setWardsLoading(true)
        setWards(await getWards(id))
        setValue('districtId', id)
        setValue('wardCode', '')
      } catch (error) {
        modalRef.current.hide()
        toast.error(error.message)
      } finally {
        setWardsLoading(false)
      }
    },
    [clearErrors, setValue]
  )

  const handleSelectWard = useCallback((id) => {
    clearErrors('wardCode')
    setValue('wardCode', id)
  }, [clearErrors, setValue])

  const handleAddNewAddressConfirm = useCallback(() => {
    submitButtonRef.current.click()
  }, [])

  const handleModalClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal
      ref={modalRef}
      headerClassName='flex justify-between items-center'
      headerTitle='Update Address'
      closeButtonText='Back'
      bodyContent={(
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          <div className='flex gap-5'>
            <TextFieldOutlined
              label="First Name"
              disabled={isSubmitting}
              errorMessage={errors?.firstName?.message}
              {...register('firstName')}
              defaultValue={getValues('firstName')}
              onInput={() => clearErrors('firstName')}
            />
            <TextFieldOutlined
              label="Last Name"
              disabled={isSubmitting}
              errorMessage={errors?.lastName?.message}
              {...register('lastName')}
              defaultValue={getValues('lastName')}
              onInput={() => clearErrors('lastName')}
            />
            <TextFieldOutlined
              label="Phone Number"
              disabled={isSubmitting}
              errorMessage={errors?.phoneNumber?.message}
              {...register('phoneNumber')}
              defaultValue={getValues('phoneNumber')}
              onInput={() => clearErrors('phoneNumber')}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <SelectorOutlined
              ref={provincesSelectorRef}
              label="Province"
              items={provinces.map((province) => ({
                id: province.id,
                name: province.name
              }))}
              defaultId={getValues('provinceId')}
              loading={provincesLoading}
              errorMessage={errors.provinceId?.message}
              {...register('provinceId')}
              onSelect={handleSelectProvince}
              disabled={isSubmitting}
            />
            <SelectorOutlined
              label="District"
              disabled={!districts.length || isSubmitting}
              items={districts.map((district) => ({
                id: district.id,
                name: district.name
              }))}
              defaultId={getValues('districtId')}
              loading={districtsLoading}
              ref={districtsSelectorRef}
              errorMessage={errors.districtId?.message}
              {...register('districtId')}
              onSelect={handleSelectDistrict}
            />
            <SelectorOutlined
              label="Ward"
              disabled={!wards.length || isSubmitting}
              items={wards.map((ward) => ({
                id: ward.code,
                name: ward.name
              }))}
              ref={wardsSelectorRef}
              {...register('wardCode')}
              defaultId={getValues('wardCode')}
              errorMessage={errors.wardCode?.message}
              onSelect={handleSelectWard}
              loading={wardsLoading}
            />
          </div>
          <TextFieldOutlined
            label="Specific Address"
            errorMessage={errors?.streetAddress?.message}
            {...register('streetAddress', {
              setValueAs: (value) => (value === '' ? null : value)
            })}
            defaultValue={getValues('streetAddress')}
            disabled={isSubmitting}
          />
          <div className="flex items-center gap-1">
            <CheckboxV2
              id="setAsDefaultCheckbox"
              {...register('setAsDefault')}
              defaultChecked={getValues('setAsDefault')}
              disabled={isSubmitting}
            />
            <label
              htmlFor="setAsDefaultCheckbox"
              className="pl-1 text-[14px] text-black/60 select-none"
            >
              Set as default
            </label>
          </div>
          <button type='submit' ref={submitButtonRef} hidden />
        </form>
      )}
      onConfirm={handleAddNewAddressConfirm}
      onClose={handleModalClose}
      disabledSubmitButton={isSubmitting}
      disabledCloseButton={isSubmitting}
    >
    </Modal>
  )
}

export default memo(forwardRef(UpdateAddressModal))
