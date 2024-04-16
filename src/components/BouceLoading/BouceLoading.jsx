import clsx from 'clsx'
import styles from './BouceLoading.module.css'

function BouceLoading({ className }) {
  const dotClasses = clsx(
    'w-[14px] h-[14px] bg-black',
    className
  )

  return (
    <div className={styles.bounceLoading}>
      <div className={dotClasses}></div>
      <div className={dotClasses}></div>
      <div className={dotClasses}></div>
    </div>
  )
}

export default BouceLoading
