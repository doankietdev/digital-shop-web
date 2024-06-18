import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Loading, Mark } from '~/components'
import CheckboxDot from '~/components/FormControls/CheckboxDot'
import { getCurrentUser } from '~/pages/Auth/AuthSlice'
import { dispatch } from '~/redux'
import addressService from '~/services/addressService'
import userService from '~/services/userService'
import { FaPlusIcon } from '~/utils/icons'

function ChangeAddress({
  handleCloseModal = () => {},
  onAddNewAddress = () => {},
  onUpdateAddress = () => {}
}) {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true)
        setAddresses(await addressService.getUserAddresses())
      } catch (error) {
        toast.error(error.messages[0])
      } finally {
        setLoading(false)
      }
    }
    fetchAddresses()
  }, [])

  const handleCheckboxClick = useCallback((value) => {
    setSelectedAddressId(value)
  }, [])

  const handleSelectAddressText = useCallback((id) => {
    setSelectedAddressId(id)
  }, [])

  const handleConfirmButtonClick = useCallback(async () => {
    const loadingToast = toast.loading('Changing address')
    try {
      setDisabled(true)
      await userService.setDefaultAddress(selectedAddressId)
      await dispatch(getCurrentUser()).unwrap()
      handleCloseModal()
      toast.success('Change address successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [handleCloseModal, selectedAddressId])

  return (
    <div className="w-[500px] h-[600px] flex flex-col">
      <div className="pb-6 border-b flex items-center justify-between">
        <h3 className="font-semibold">My Addresses</h3>
        <Button
          primary
          outlined
          rounded
          disabled={disabled}
          icon={<FaPlusIcon />}
          onClick={onAddNewAddress}
        >
          Add New Address
        </Button>
      </div>

      {/* Address items */}
      <div
        className={clsx('flex-1 overflow-y-auto border-b', {
          'flex justify-center items-center': loading
        })}
      >
        {loading ? (
          <Loading />
        ) : (
          <ul
            className={clsx('py-6 flex flex-col gap-4', {
              'items-center': loading
            })}
          >
            {addresses.map((address) => {
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
        )}
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button primary outlined rounded onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          primary
          rounded
          disabled={disabled || !selectedAddressId}
          onClick={handleConfirmButtonClick}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default ChangeAddress
