import clsx from 'clsx'

function Button({ children, className, primary, icon, type = 'button' }) {
  const classes = clsx(
    {
      'bg-main': primary,
      'hover:bg-black': primary
    },
    {
      'bg-black': !primary,
      'hover:bg-[#393939]': !primary
    },
    className,
    'transition-all duration-200  px-[15px]',
    'text-white text-[16px] font-medium',
    'min-w-[140px] h-[40px]',
    'py-[11px]',
    'flex justify-center items-center gap-2'
  )

  return (
    <button type={type} className={classes}>
      {icon}
      {children}
    </button>
  )
}

export default Button
