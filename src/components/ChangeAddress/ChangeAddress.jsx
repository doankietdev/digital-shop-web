import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Mark } from '~/components'
import CheckboxDot from '~/components/FormControls/CheckboxDot'
import { getCurrentUser } from '~/pages/Auth/AuthSlice'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import userService from '~/services/userService'
import { FaPlusIcon } from '~/utils/icons'

function ChangeAddress({
  handleCloseModal = () => {},
  onAddNewAddress = () => {},
  onUpdateAddress = () => {},
  hideCancel = false,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  successChangeAddressText = 'Change address successfully',
  loadingChangeAddressText = 'Changing address'
}) {
  const [disabled, setDisabled] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  const { current: user } = useSelector(userSelector)

  const handleCheckboxClick = useCallback((value) => {
    setSelectedAddressId(value)
  }, [])

  const handleSelectAddressText = useCallback((id) => {
    setSelectedAddressId(id)
  }, [])

  const handleConfirmButtonClick = useCallback(async () => {
    const loadingToast = toast.loading(loadingChangeAddressText)
    try {
      setDisabled(true)
      await userService.setDefaultAddress(selectedAddressId)
      await dispatch(getCurrentUser()).unwrap()
      handleCloseModal()
      toast.success(successChangeAddressText)
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [handleCloseModal, loadingChangeAddressText, selectedAddressId, successChangeAddressText])

  return (
    <ul
      className={clsx('py-[20px] md:py-[24px] flex-1 h-[440px] overflow-y-auto flex flex-col gap-4')}
    >
      {user.addresses.map((address) => {
        const { streetAddress, ward, district, province } = address
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
              <div className="flex justify-between gap-2 mb-1">
                <span
                  onClick={() => handleSelectAddressText(address._id)}
                >
                  {`${streetAddress ? streetAddress + ', ' : ''}${ward.name}, ${district.name}, ${province.name}`}
                </span>
                <button
                  className="text-[14px] text-purple-500 h-fit"
                  onClick={() => onUpdateAddress(address._id)}
                  disabled={disabled}
                >
                        Update
                </button>
              </div>
              {address.default && <Mark>Default</Mark>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ChangeAddress
