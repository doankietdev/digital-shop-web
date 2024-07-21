/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Mark, Modal } from '~/components'
import CheckboxDot from '~/components/FormControls/CheckboxDot'
import { getCurrentUser } from '~/pages/Auth/AuthSlice'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import userService from '~/services/userService'
import { FaPlusIcon } from '~/utils/icons'

function ChangeAddressModal({
  onAddNewAddressButtonClick = () => {},
  onUpdateAddressButtonClick = () => {}
}, ref) {
  const [disabled, setDisabled] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  const modalRef = useRef()

  useImperativeHandle(ref, () => ({
    ...modalRef.current
  }))

  const { current: user } = useSelector(userSelector)

  const handleCheckboxClick = useCallback((value) => {
    setSelectedAddressId(value)
  }, [])

  const handleSelectAddress = useCallback((id) => {
    setSelectedAddressId(id)
  }, [])

  const handleChangeAddressConfirm = useCallback(async () => {
    const loadingToast = toast.loading('Changing address...')
    try {
      setDisabled(true)
      await userService.setDefaultAddress(selectedAddressId)
      await dispatch(getCurrentUser()).unwrap()
      modalRef.current.hide()
      toast.success('Change address successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [selectedAddressId])


  return (
    <Modal
      ref={modalRef}
      headerClassName='flex justify-between items-center'
      bodyClassName='py-0 md:py-0'
      headerContent={(
        <>
          <h3 className="font-semibold">My Addresses</h3>
          <Button
            primary
            outlined
            rounded
            disabled={disabled}
            icon={<FaPlusIcon />}
            className='!text-[14px] px-[12px] py-[8px]'
            onClick={onAddNewAddressButtonClick}
          >
            Add New Address
          </Button>
        </>
      )}
      bodyContent={(
        <ul
          className={clsx('py-[20px] md:py-[24px] flex-1 h-[440px] overflow-y-auto flex flex-col gap-4')}
        >
          {user.addresses.map((address, index) => {
            const { firstName, lastName, phoneNumber, streetAddress, ward, district, province } = address
            return (
              <li key={address._id} className="flex">
                <div className="mr-3">
                  <CheckboxDot
                    disabled={disabled}
                    selected={
                      selectedAddressId
                        ? address._id === selectedAddressId
                        : address.default
                    }
                    value={address._id}
                    onClick={handleCheckboxClick}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <p
                      className='flex flex-col items-start gap-2'
                      onClick={() => handleSelectAddress(address._id)}
                    >
                      <p className='flex gap-2'>
                        <span className='font-medium'>{`${firstName} ${lastName}`}</span>
                        <span>-</span>
                        <span>{phoneNumber}</span>
                      </p>
                      <p>
                        {`${streetAddress ? streetAddress + ', ' : ''}${ward.name}, ${district.name}, ${province.name}`}
                      </p>
                      {address.default && (
                        <p><Mark>Default</Mark></p>
                      )}
                    </p>
                    <button
                      className="text-[14px] text-purple-500 h-fit"
                      onClick={() => onUpdateAddressButtonClick(index)}
                      disabled={disabled}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      onConfirm={handleChangeAddressConfirm}
    />
  )
}

export default memo(forwardRef(ChangeAddressModal))
