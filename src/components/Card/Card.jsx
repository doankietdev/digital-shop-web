import clsx from 'clsx'

function Card({ children, className, onClick }) {
  return (
    <div
      className={clsx(
        'p-3 rounded overflow-hidden shadow-card',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
