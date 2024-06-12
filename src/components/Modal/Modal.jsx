/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { memo } from 'react'
import Card from '../Card'

function Modal({ open, onClose, children }) {
  const handleCloseModal = () => {
    onClose()
  }
  return (
    <div
      onClick={handleCloseModal}
      className={clsx(
        'fixed z-[100] inset-0 flex justify-center items-center transition-all duration-300',
        {
          'bg-black/30': open,
          hidden: !open
        }
      )}
    >
      <Card
        className={clsx('bg-white p-6 transition-all', {
          'scale-100 opacity-100': open,
          'scale-150 opacity-0': !open
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Card>
    </div>
  )
}

export default memo(Modal)
