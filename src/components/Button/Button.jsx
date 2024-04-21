import clsx from 'clsx'

function Button({
  children,
  className,
  primary,
  outlined,
  rounded,
  icon,
  startIcon,
  type = 'button',
  disabled = false,
  onClick
}) {
  const classes = clsx(
    {
      'text-white': !outlined
    },
    {
      'bg-primary-400': primary && !outlined,
      'hover:bg-black': primary && !outlined && !disabled
    },
    {
      'border-main': primary && outlined,
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
    className,
    'px-[15px]',
    'text-[16px] font-medium',
    'min-w-[140px] h-[40px]',
    'py-[11px]',
    'flex justify-center items-center gap-2',
    'outline-none'
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
      {startIcon && (
        <div className='absolute top-1/2 left-4 translate-y-[-50%]'>
          {startIcon}
        </div>
      )}
      {icon}
      {children}
    </button>
  )
}

export default Button
