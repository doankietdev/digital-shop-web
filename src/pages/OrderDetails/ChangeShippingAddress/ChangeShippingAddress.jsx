import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Loading, Mark } from '~/components'
import CheckboxDot from '~/components/FormControls/CheckboxDot'
import addressService from '~/services/addressService'
import orderService from '~/services/orderService'
import { FaPlusIcon } from '~/utils/icons'

function ChangeShippingAddress({
  orderId,
  currentAddressId,
  setOrder = () => {},
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
      const order = await orderService.updateShippingAddressOfCurrentUser({
        orderId,
        addressId: selectedAddressId
      })
      setOrder(order)
      handleCloseModal()
      toast.success('Change address successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [handleCloseModal, orderId, selectedAddressId, setOrder])

  return (
    <div className="min-w-[620px] h-[600px] flex flex-col">
      <div className="pb-6 border-b flex items-center justify-between gap-2 md:gap-0">
        <h3 className="font-semibold">My Addresses</h3>
        <Button
          primary
          outlined
          rounded
          disabled={disabled || loading}
          icon={<FaPlusIcon />}
          onClick={onAddNewAddress}
          className='!text-[14px] px-[12px] py-[8px]'
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
                          : address._id === currentAddressId
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

export default ChangeShippingAddress
