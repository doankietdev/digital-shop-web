import clsx from 'clsx'

function Button({
  children,
  color,
  bgColor,
  borderColor,
  className,
  primary,
  outlined,
  rounded,
  icon,
  type = 'button',
  onClick
}) {
  const renderedColor = color || null
  const renderedBgColor = bgColor || null
  const renderedBorderColor = borderColor || null

  const classes = clsx(
    {
      'text-white': !color
    },
    {
      'bg-main': primary && !outlined && !bgColor,
      'hover:bg-black': primary && !outlined && !bgColor
    },
    {
      'border-main': primary && outlined && !borderColor,
      'text-main': primary && outlined && !color
    },
    {
      'bg-black': !primary && !outlined && !bgColor,
      'hover:bg-[#393939]': !primary && !outlined && !bgColor
    },
    {
      border: outlined,
      'border-black': outlined && !borderColor,
      'hover:border-[2px]': outlined,
      'text-black': outlined && !color,
      'transition-all duration-200': !outlined
    },
    {
      'rounded-lg': rounded
    },
    renderedColor,
    renderedBgColor,
    renderedBorderColor,
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
