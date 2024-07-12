/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo, useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AddNewAddressModal, Button, DocumentTitle, Mark, UpdateAddressModal } from '~/components'
import { dispatch } from '~/redux'
import { userSelector } from '~/redux/selectors'
import userService from '~/services/userService'
import { getCurrentUser } from '../Auth/AuthSlice'
import { FaPlusIcon } from '~/utils/icons'

function Addresses() {
  const [disabled, setDisabled] = useState(false)
  const [addressIndexToUpdate, setAddressIndexToUpdate] = useState(null)

  const updateAddressModalRef = useRef()
  const addNewAddressModalRef = useRef()

  const { current: user } = useSelector(userSelector)

  const handleSetAsDefault = useCallback(async (index) => {
    const loadingToast = toast.loading('Setting address as default...')
    try {
      setDisabled(true)
      await userService.setDefaultAddress(user.addresses[index]?._id)
      await dispatch(getCurrentUser()).unwrap()
      toast.success('Set address as default successfully')
    } catch (error) {
      toast.error(error.messages[0])
    } finally {
      setDisabled(false)
      toast.dismiss(loadingToast)
    }
  }, [user.addresses])

  const handleUpdateAddressClick = useCallback((index) => {
    setAddressIndexToUpdate(index)
    updateAddressModalRef.current.show()
  }, [])

  const handleAddNewAddressButtonClick = useCallback(() => {
    addNewAddressModalRef.current.show()
  }, [])

  return (
    <>
      <DocumentTitle title='Addresses' />
      <div className="flex justify-center">
        <div className='max-w-[800px] w-full'>
          <div className='flex justify-between items-center gap-[8px]'>
            <h2 className='font-medium text-[18px] text-center'>My Addresses</h2>
            <Button
              primary
              rounded
              disabled={disabled}
              icon={<FaPlusIcon className='icon' />}
              className='!text-[14px] !px-[16px] !py-[8px]'
              onClick={handleAddNewAddressButtonClick}
            >
              Add New Address
            </Button>
          </div>
          <ul className={clsx('mt-7 flex-1')}>
            {user.addresses.map((address, index) => {
              const { streetAddress, ward, district, province } = address
              return (
                <li
                  key={address._id}
                  className="py-[20px] border-t flex flex-col md:flex-row md:justify-between md:items-center gap-[12px]"
                >
                  <div className="flex flex-col items-start gap-2">
                    <span>
                      {`${streetAddress ? streetAddress + ', ' : ''}${ward.name}, ${district.name}, ${province.name}`}
                    </span>
                    {address.default && <Mark>Default</Mark>}
                  </div>

                  <div className='flex flex-col md:flex-row gap-[14px] md:gap-[8px]'>
                    <Button
                      outlined
                      rounded
                      className='!px-[22px] !py-[8px] !text-[12px]'
                      onClick={() => handleSetAsDefault(index)}
                      disabled={disabled || address.default}
                    >
                        Set As Default
                    </Button>

                    <Button
                      outlined
                      rounded
                      className='!px-[22px] !py-[8px] !text-[12px]'
                      onClick={() => handleUpdateAddressClick(index)}
                      disabled={disabled}
                    >
                        Update
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <UpdateAddressModal
        ref={updateAddressModalRef}
        address={user.addresses[addressIndexToUpdate]}
      />

      <AddNewAddressModal ref={addNewAddressModalRef} />
    </>
  )
}

export default memo(Addresses)
