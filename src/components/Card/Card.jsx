import clsx from 'clsx'

function Card({ children, className }) {
  return (
    <div
      className={clsx(
        'bg-white p-3 rounded overflow-hidden shadow-card',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
