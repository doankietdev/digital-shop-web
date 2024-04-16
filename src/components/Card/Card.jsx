import clsx from 'clsx'
import styles from './Card.module.css'

function Card({ children, className }) {
  return (
    <div
      className={clsx(
        styles.card,
        'bg-white px-4 py-10 min-w-[860px] rounded-[30px] overflow-hidden flex flex-col items-center gap-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
