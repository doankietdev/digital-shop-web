import clsx from 'clsx'

function ProductSkeleton({ horizontal, className }) {
  return (
    <div
      className={clsx(
        {
          'grid grid-cols-4 relative': horizontal
        },
        className,
        'mx-[10px] p-[15px] relative flex flex-col rounded shadow-card bg-white h-full'
      )}
    >
      <div
        className={clsx(
          {
            'col-span-1 h-[120px]': horizontal,
            'relative h-[200px]': !horizontal
          },
          'animate-pulse max-w-full bg-gray-200 rounded-lg w-full'
        )}
      ></div>
      <div
        className={clsx('mt-5', {
          'col-span-3': horizontal
        })}
      >
        <h3 className='h-6 mb-[10px] bg-gray-200 rounded-full animate-pulse'></h3>
        <div className='h-[19.5px] w-[140px] bg-gray-200 rounded-full animate-pulse'></div>
        <div className='h-6 bg-gray-200 rounded-full mt-[10px] animate-pulse'></div>
      </div>
    </div>
  )
}

export default ProductSkeleton
