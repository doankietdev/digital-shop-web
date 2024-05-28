import clsx from 'clsx'
import { useState } from 'react'

function Variants({ variants = [], defaultVariantId, onSelect = () => {} }) {
  const [selectedVariant, setSelectedVariant] = useState(
    () => defaultVariantId || null
  )

  const handleClick = (variant) => {
    setSelectedVariant(variant)
    onSelect(variant)
  }

  return (
    <div className='flex items-center gap-4 flex-wrap max-h-[220px]'>
      {variants?.map((variant, index) => (
        <button
          key={index}
          className={clsx('border-2 rounded-sm py-1 px-2 text-sm bg-white', {
            'border-primary-400':
              selectedVariant && selectedVariant?._id === variant?._id
          })}
          onClick={() => handleClick(variant)}
        >
          {variant.name}
        </button>
      ))}
    </div>
  )
}

export default Variants
