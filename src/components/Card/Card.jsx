import clsx from 'clsx'

function Card({ children, className, onClick }) {
  return (
    <div
      className={clsx(
        'p-2 md:p-3 rounded shadow-card',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
