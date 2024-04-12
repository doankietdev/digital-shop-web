import clsx from 'clsx'

function Input({
  className,
  type = 'text',
  placeholder,
  primary,
  outlined,
  rounded
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          {
            'border-[1px] hover:border-[2px] focus:border-[2px] bg-transparent':
              outlined,
            'text-black': !outlined
          },
          {
            'border-main text-main placeholder:text-dark-main':
              primary && outlined
          },
          {
            'bg-main text-white placeholder:text-[#d4d4d4]':
              primary && !outlined
          },
          {
            'rounded-lg': rounded
          },
          className,
          'w-full px-[15px] py-[10px] outline-none '
        )}
      />
    </div>
  )
}

export default Input
