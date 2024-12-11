import clsx from 'clsx'

function Divider({ className, direction = 'horizontal' }) {
  return (
    <div className={clsx(
      {
        'border-l-[1px]': direction === 'vertical',
        'border-t-[1px] h-full': direction === 'horizontal'
      },
      className,
      'border-gray-200'
    )} />
  )
}

export default Divider
