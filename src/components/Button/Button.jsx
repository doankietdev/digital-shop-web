import clsx from 'clsx'

function Button({
  children,
  textColor,
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
  const renderedColor = `text=[${textColor}]` || null
  const renderedBgColor = `bg-[${bgColor}]` || null
  const renderedBorderColor = `border-[${borderColor}]` || null

  const classes = clsx(
    {
      'text-white': !textColor && !outlined
    },
    {
      'bg-main': primary && !outlined && !bgColor,
      'hover:bg-black': primary && !outlined && !bgColor
    },
    {
      'border-main': primary && outlined && !borderColor,
      'text-main': primary && outlined && !textColor
    },
    {
      'bg-black hover:bg-[#161616]': !primary && !outlined && !bgColor
    },
    {
      border: outlined,
      'border-black': outlined && !borderColor,
      'hover:border-[2px]': outlined,
      'text-black': outlined && !textColor,
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
