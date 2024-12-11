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

function AddNewAddressModal({
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

  const provincesSelectorRef = useRef(null)
  const districtsSelectorRef = useRef(null)
  const wardsSelectorRef = useRef(null)

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
    reset,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      provinceId: '',
      districtId: '',
      wardCode: '',
      streetAddress: '',
      setAsDefault: false
    },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setProvincesLoading(true)
        setProvinces(await getProvinces())
      } catch (error) {
        modalRef.current.hide()
        toast.error(error.message)
      } finally {
        setProvincesLoading(false)
      }
    }
    fetchProvinces()
  }, [reset, setValue])

  const onSubmit = useCallback(async (data) => {
    const loadingToast = toast.loading('Adding new address...')
    try {
      await addressService.createNewAddress(data)
      await dispatch(getCurrentUser()).unwrap()

      setDistricts([])
      setWards([])
      reset({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        provinceId: '',
        districtId: '',
        wardCode: '',
        streetAddress: '',
        setAsDefault: false
      })

      onSuccess()
      modalRef.current.hide()
      toast.success('Add new address successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.dismiss(loadingToast)
    }
  }, [onSuccess, reset])

  const handleSelectProvince = useCallback(
    async (id) => {
      try {
        clearErrors('provinceId')
        setDistrictsLoading(true)

        setDistricts(await getDistricts(id))
        setWards([])

        setValue('provinceId', id)
        setValue('districtId', null)
        setValue('wardCode', null)
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
        wardsSelectorRef.current?.reset()

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
    setDistricts([])
    setWards([])
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      provinceId: '',
      districtId: '',
      wardCode: null,
      streetAddress: '',
      setAsDefault: false
    })
    onClose()
  }, [onClose, reset])

  return (
    <Modal
      ref={modalRef}
      headerClassName='flex justify-between items-center'
      headerTitle='Add New Address'
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
              disabled={isSubmitting}
              label="Province"
              defaultId={getValues('provinceId')}
              items={provinces.map((province) => ({
                id: province.id,
                name: province.name
              }))}
              loading={provincesLoading}
              errorMessage={errors.provinceId?.message}
              {...register('province')}
              onSelect={handleSelectProvince}
            />
            <SelectorOutlined
              label="District"
              disabled={!districts.length || isSubmitting}
              defaultId={getValues('districtId')}
              items={districts.map((district) => ({
                id: district.id,
                name: district.name
              }))}
              loading={districtsLoading}
              ref={districtsSelectorRef}
              errorMessage={errors.districtId?.message}
              {...register('district')}
              onSelect={handleSelectDistrict}
            />
            <SelectorOutlined
              label="Ward"
              disabled={!wards.length || isSubmitting}
              defaultId={getValues('wardCode')}
              items={wards.map((ward) => ({
                id: ward.code,
                name: ward.name
              }))}
              loading={wardsLoading}
              ref={wardsSelectorRef}
              errorMessage={errors.wardCode?.message}
              {...register('ward')}
              onSelect={handleSelectWard}
            />
          </div>
          <TextFieldOutlined
            label="Specific Address"
            disabled={isSubmitting}
            errorMessage={errors?.streetAddress?.message}
            {...register('streetAddress')}
            defaultValue={getValues('streetAddress')}
            onInput={() => clearErrors('streetAddress')}
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

export default memo(forwardRef(AddNewAddressModal))
