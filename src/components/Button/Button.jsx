import clsx from 'clsx'

function Button({
  children,
  className,
  primary,
  outlined,
  rounded,
  icon,
  type = 'button',
  onClick
}) {
  const classes = clsx(
    {
      'text-white': !outlined
    },
    {
      'bg-main': primary && !outlined,
      'hover:bg-black': primary && !outlined
    },
    {
      'border-main': primary && outlined,
      'text-main': primary && outlined
    },
    {
      'bg-black hover:bg-[#161616]': !primary && !outlined
    },
    {
      border: outlined,
      'border-black': outlined,
      'hover:border-[2px]': outlined,
      'text-black': outlined,
      'transition-all duration-200': !outlined
    },
    {
      'rounded-lg': rounded
    },
    className,
    'px-[15px]',
    'text-[16px] font-medium',
    'min-w-[140px] h-[40px]',
    'py-[11px]',
    'flex justify-center items-center gap-2',
    'outline-none'
  )

  return (
    <button onClick={onClick} type={type} className={classes}>
      {icon}
      {children}
    </button>
  )
}

export default Button
