import clsx from 'clsx'
import noProductImage from '~/assets/no-product.jpg'

function NoProductsAvailable({ className, imageClassName, labelClassName }) {
  return (
    <div
      className={clsx(
        'h-full flex flex-col justify-center items-center',
        className
      )}
    >
      <img src={noProductImage} className={clsx('h-[260px] object-contain', imageClassName)} />
      <span className={clsx(
        'text-2xl font-medium text-[#A2A2A2]',
        labelClassName
      )}>
        No Products Found
      </span>
    </div>
  )
}

export default NoProductsAvailable
