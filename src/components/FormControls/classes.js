import clsx from 'clsx'

const inputClasses = ({ primary, outlined, rounded, hasError, className }) => {
  return clsx(
    {
      'border-[1px] hover:border-[2px] focus:border-[2px] bg-transparent placeholder:text-[#cacaca]':
        outlined,
      'text-black': !outlined
    },
    {
      'border-main text-primary-400 placeholder:text-primary-600':
        primary && outlined && !hasError
    },
    {
      'bg-primary-400 text-white placeholder:text-[#d4d4d4]':
        primary && !outlined && !hasError
    },
    {
      'rounded-lg': rounded
    },
    {
      // default input error
      'border border-red-500 hover:border-[2px] focus:border-[2px]':
        hasError
    },
    'border-[#a2a2a2] w-full h-[44px] px-5 outline-none placeholder:capitalize',
    className
  )
}

const errorMessageClasses = () => 'text-[12px] text-red-500'

export { inputClasses, errorMessageClasses }
