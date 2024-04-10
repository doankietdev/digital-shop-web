import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.dotSpinner}>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
    </div>
  )
}

export default Loading
