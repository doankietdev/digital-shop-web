/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { useOutsideClick } from '~/hooks'
import Button from '../Button'
import Divider from '../Divider'

function Modal({
  closeButtonText = 'Close',
  confirmButtonText = 'Confirm',
  onConfirm = () => {},
  onClose = () => {},
  onOutSideClick = () => {},
  disabledSubmitButton = false,
  disabledCloseButton = false,
  headerContent,
  bodyContent,
  headerTitle = '',
  headerClassName = '',
  bodyClassName = ''
}, ref) {
  const [show, setShow] = useState(false)

  const modalRef = useRef()
  const modalContentRef = useRef()

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true)
    },
    hide() {
      setShow(false)
    }
  }))

  useOutsideClick(modalContentRef, () => {
    setShow(false)
    onOutSideClick()
  })

  const handleCloseButtonClick = useCallback(() => {
    setShow(false)
    onClose()
  }, [onClose])

  return (
    <div
      ref={modalRef}
      className={clsx(
        'fixed z-[100] inset-0 bg-black/40',
        {
          'flex justify-center items-center': show,
          'hidden': !show
        }
      )}
    >
      <div
        ref={modalContentRef}
        className='animate-growthCenter bg-white shadow-card rounded-md max-w-[800px] w-full mx-[12px]'
      >
        {/* modal header */}
        <div className={clsx(
          'p-[20px] md:p-[24px]',
          headerClassName
        )}>
          {headerContent ? (
            headerContent
          ) : (
            <h3 className="font-semibold text-center capitalize">{headerTitle}</h3>
          )}
        </div>

        <Divider />

        {/* modal body */}
        <div
          className={clsx(
            bodyClassName,
            'p-[20px] md:p-[24px]'
          )}
        >
          {bodyContent}
        </div>

        <Divider />

        {/* modal footer */}
        <div className="p-[20px] md:p-[24px] flex justify-end gap-3">
          <Button
            primary
            outlined
            rounded
            disabled={disabledCloseButton}
            className='capitalize'
            onClick={handleCloseButtonClick}
          >
            {closeButtonText}
          </Button>
          <Button
            primary
            rounded
            disabled={disabledSubmitButton}
            className='capitalize'
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(forwardRef(Modal))
