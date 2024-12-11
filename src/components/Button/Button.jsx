import clsx from 'clsx'

function Button({
  children,
  className = '',
  primary = false,
  outlined = false,
  rounded = false,
  icon,
  startIcon,
  type = 'button',
  disabled = false,
  onClick
}) {
  const classes = clsx(
    `flex items-center justify-center leading-4 select-none text-[14px] md:text-[14px]
      px-[36px] h-[44px] md:h-[36px] font-medium outline-none`,
    {
      'text-white': !outlined
    },
    {
      'bg-primary-400': primary && !outlined,
      'hover:bg-primary-200': primary && !outlined && !disabled
    },
    {
      'border-primary-400': primary && outlined,
      'text-primary-400': primary && outlined
    },
    {
      'bg-black hover:bg-[#161616]': !primary && !outlined && !disabled
    },
    {
      border: outlined,
      'border-black': outlined,
      'hover:border-[2px]': outlined && !disabled,
      'text-black': outlined,
      'transition-all duration-200': !outlined
    },
    {
      'rounded-lg': rounded
    },
    className
  )

  return (
    <button
      type={type}
      className={clsx(classes, {
        relative: startIcon,
        'opacity-70': disabled
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon && <span className="absolute top-1/2 left-4 translate-y-[-50%]">{startIcon}</span>}
      {icon && <span className='mr-[8px]'>{icon}</span>}
      {children}
    </button>
  )
}

export default Button
