import clsx from 'clsx'
import styles from './Loading.module.css'

function Loading({ white }) {
  const dotClasses = {
    'before:bg-white': white,
    'before:bg-black': !white
  }
  return (
    <div className={styles.dotSpinner}>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
      <div className={clsx(dotClasses, styles.dotSpinner__dot)}></div>
    </div>
  )
}

export default Loading
