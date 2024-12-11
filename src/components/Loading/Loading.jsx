/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import styles from './Loading.module.css'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'

function Loading({
  white,
  className = '',
  dotSpinnerClassName = ''
}, ref) {
  const dotClasses = {
    'before:bg-white': white,
    'before:bg-black': !white
  }

  const dotSpinnerRef = useRef()

  useImperativeHandle(ref, () => ({
    resize(size = '40px') {
      dotSpinnerRef.current.style.setProperty('--uib-size', size)
    }
  }))

  return (
    <div ref={dotSpinnerRef} className={clsx(styles.dotSpinner, className)}>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
      <div
        className={clsx(
          dotClasses,
          dotSpinnerClassName,
          styles.dotSpinner__dot
        )}
      ></div>
    </div>
  )
}

export default memo(forwardRef(Loading))
