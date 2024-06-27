/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo } from 'react'
import Card from '../Card'

function Modal({ onClose, children }) {
  const handleCloseModal = () => {
    onClose()
  }
  return (
    <div
      onClick={handleCloseModal}
      className={clsx(
        'fixed z-[100] inset-0 flex justify-center items-center bg-black/30'
      )}
    >
      <Card
        className={clsx('bg-white p-6 mx-2')}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Card>
    </div>
  )
}

export default memo(Modal)
