import clsx from 'clsx'

function TimePartial({
  label,
  number,
  width = '50px',
  height = width,
  backgroundColor = '#f4f4f4',
  numberColor,
  numberSize = '18px',
  labelColor = '#8b8b8b',
  labelSize = '12px'
}) {
  const textColorClass = `text-[${numberColor}]`
  const labelColorClass = `text-[${labelColor}]`

  return (
    <div
      className={clsx(
        `w-[${width}]`,
        `h-[${height}]`,
        `bg-[${backgroundColor}]`,
        'min-w-[60px] flex flex-col justify-center items-center px-[5px] py-[10px]'
      )}
    >
      <span
        className={clsx(
          {
            [textColorClass]: !!numberColor
          },
          `text-[${numberSize}]`,
          'font-semibold'
        )}
      >
        {number}
      </span>
      <span
        className={clsx(
          {
            [labelColorClass]: !!labelColor
          },
          labelColor,
          `text-[${labelSize}]`,
          'capitalize'
        )}
      >
        {label}
      </span>
    </div>
  )
}

export default TimePartial
