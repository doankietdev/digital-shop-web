import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { MdOutlineNewLabel } from 'react-icons/md'
import { FaArrowTrendUp } from 'react-icons/fa6'
import clsx from 'clsx'

import { formatCash } from '~/utils/formatter'
import noImage from '~/assets/no-image.png'
import { routesConfig } from '~/config'
import { Rating } from '~/components'
import Options from './Options'
import styles from './Product.module.css'

const labels = {
  favorites: {
    icon: FaHeart,
    name: 'Favorite',
    color: '#fff',
    backgroundColor: '#ee3131',
    iconSize: '16px'
  },
  new: {
    icon: MdOutlineNewLabel,
    name: 'New',
    color: '#fff',
    backgroundColor: '#00d5d5',
    iconSize: '16px'
  },
  trending: {
    icon: FaArrowTrendUp,
    name: 'Trending',
    color: '#fff',
    backgroundColor: '#097ef6',
    iconSize: '16px'
  }
}

function Product({
  product,
  className,
  horizontal,
  showLabel,
  autoLabel,
  labelName,
  labelIcon,
  labelIconSize = '16px',
  labelColor = '#fff',
  labelBackgroundColor = '#ee3131'
}) {
  const [label, setLabel] = useState(null)

  useEffect(() => {
    if (autoLabel) {
      const createdDate = new Date(product.createdAt)
      const nowDate = new Date()
      const diffTime = Math.abs(nowDate - createdDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      const NEW_DISTANCE_DAY = 10
      const TRENDING_SOLD = 20
      const FAVORITE_RATING = 4

      const isTrending =
        product.sold >= TRENDING_SOLD &&
        product.averageRatings >= FAVORITE_RATING
      const isFavorite = product.averageRatings >= FAVORITE_RATING
      const isNew = diffDays <= NEW_DISTANCE_DAY

      if (isTrending) {
        setLabel(labels.trending)
      } else if (isFavorite) {
        setLabel(labels.favorites)
      } else if (isNew) {
        setLabel(labels.new)
      }
    }
  }, [autoLabel, product.averageRatings, product.createdAt, product.sold])

  let LabelIcon = labelIcon
  let renderedLabelIconSize = labelIconSize
  let renderedLabelName = labelName
  let renderedLabelColor = labelColor
  let renderedLabelBackgroundColor = labelBackgroundColor

  if (autoLabel) {
    LabelIcon = label?.icon
    renderedLabelName = label?.name
    renderedLabelColor = label?.color
    renderedLabelBackgroundColor = label?.backgroundColor
    renderedLabelIconSize = label?.iconSize
  }

  return (
    <div
      className={clsx(
        {
          'flex grid grid-cols-4 relative': horizontal,
          'h-[384px]': !horizontal
        },
        styles.card,
        className,
        'mx-[10px] p-[15px] border relative'
      )}
    >
      <div
        className={clsx(
          {
            'col-span-1': horizontal,
            relative: !horizontal
          },
          'flex'
        )}
      >
        <Link className='flex-1' to={routesConfig.productDetails(product.slug)}>
          <img
            src={product.thumb || noImage}
            alt={product.title}
            className={clsx(
              {
                'h-[120px]': horizontal,
                'h-full': !horizontal
              },
              'w-full object-contain'
            )}
          />
        </Link>
        <Options
          slug={product.slug}
          className={clsx(
            {
              'bottom-[20px]': horizontal,
              'bottom-0': !horizontal
            },
            styles.card__options,
            'absolute left-[50%] translate-x-[-50%]'
          )}
        />
      </div>
      <div
        className={clsx(
          {
            'col-span-3': horizontal
          },
          'ml-5'
        )}
      >
        <Link to={routesConfig.productDetails(product.slug)}>
          <h3 className='hover:text-main mb-[10px] capitalize line-clamp-1'>
            {product.title}
          </h3>
        </Link>
        <Rating size='15px' averageRatings={product.averageRatings} />
        <div className='mt-[10px] flex items-center'>
          {product.oldPrice ? (
            <span className='mr-3 text-sm text-gray-500 line-through'>
              {formatCash(product.oldPrice)}
            </span>
          ) : (
            ''
          )}
          <span>{formatCash(product.price)}</span>
        </div>
      </div>
      {showLabel && label ? (
        <div
          className={styles.card__label}
          style={{
            color: renderedLabelBackgroundColor
          }}
        >
          {LabelIcon ? (
            <LabelIcon
              size={renderedLabelIconSize}
              color={renderedLabelColor}
            />
          ) : (
            ''
          )}
          <span
            style={{
              color: renderedLabelColor
            }}
            className='text-xs px-[6px]'
          >
            {renderedLabelName}
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Product
