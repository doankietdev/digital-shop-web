/* eslint-disable react-refresh/only-export-components */
import { memo, useCallback, useState } from 'react'
import { AddNewAddress, ChangeAddress, Modal, UpdateAddress } from '~/components'

function Addresses() {
  const [openModal, setOpenModal] = useState(false)
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false)
  const [addressIdToUpdate, setAddressIdToUpdate] = useState(null)

  const handleAddNewAddressClick = useCallback(() => {
    setOpenModal(true)
    setOpenAddAddress(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
    setOpenAddAddress(false)
  }, [])

  const handleCloseAddAddress = useCallback(() => {
    setOpenModal(false)
    setOpenAddAddress(false)
  }, [])

  const handleCloseUpdateAddress = useCallback(() => {
    setAddressIdToUpdate(null)
    setOpenModal(false)
    setOpenUpdateAddress(false)
  }, [])

  const handleUpdateAddress = useCallback((addressId) => {
    setAddressIdToUpdate(addressId)
    setOpenModal(true)
    setOpenUpdateAddress(true)
  }, [])

  return (
    <>
      <ChangeAddress
        confirmText='Set To Default'
        successChangeAddressText='Set to default successfully'
        loadingChangeAddressText='Setting to default...'
        hideCancel
        handleCloseModal={handleCloseModal}
        onAddNewAddress={handleAddNewAddressClick}
        onUpdateAddress={handleUpdateAddress}
      />
      {openModal && (
        <Modal onClose={handleCloseModal}>
          {openAddAddress && <AddNewAddress onClose={handleCloseAddAddress} />}
          {openUpdateAddress && (
            <UpdateAddress
              addressId={addressIdToUpdate}
              onClose={handleCloseUpdateAddress}
            />
          )}
        </Modal>
      )}
    </>
  )
}

export default memo(Addresses)
