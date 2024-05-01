import clsx from 'clsx'

function ReactSlickArrow({ className, children, onClick }) {
  return (
    <button
      className={clsx(
        '!bg-black !bg-opacity-20 !text-white text-[20px] flex justify-center items-center hover:!bg-primary-200 hover:text-white w-10 h-10 z-10 rounded-full',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ReactSlickArrow
