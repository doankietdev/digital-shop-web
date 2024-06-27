import clsx from 'clsx'
import styles from './Loading.module.css'

function Loading({ white, className = '', dotSpinnerClassName = '' }) {
  const dotClasses = {
    'before:bg-white': white,
    'before:bg-black': !white
  }
  return (
    <div className={clsx(styles.dotSpinner, className)}>
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

export default Loading
