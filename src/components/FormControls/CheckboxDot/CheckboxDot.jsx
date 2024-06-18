import clsx from 'clsx'

function CheckboxDot({ disabled = false, selected = false, value, onClick }) {
  return (
    <div
      className={clsx(
        'cursor-pointer w-[18px] h-[18px] rounded-full border-2 flex justify-center items-center',
        {
          'border-primary-400': selected,
          'border-black/20': !selected
        }
      )}
      onClick={() => !disabled && onClick(value)}
    >
      <div
        className={clsx('w-[6px] h-[6px] rounded-full bg-primary-400', {
          hidden: !selected
        })}
      ></div>
    </div>
  )
}

export default CheckboxDot
