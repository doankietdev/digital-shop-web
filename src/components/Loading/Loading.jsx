import clsx from 'clsx'
import styles from './Loading.module.css'

function Loading({ color }) {
  const dotClasses = {
    ['before:bg-[' + color + ']']: !!color,
    'before:bg-black': !color
  }
  console.log(dotClasses)
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
