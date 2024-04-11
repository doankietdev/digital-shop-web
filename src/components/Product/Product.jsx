import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaStackOverflow } from 'react-icons/fa'
import { MdOutlineNewLabel } from 'react-icons/md'
import { FaArrowTrendUp } from 'react-icons/fa6'
import clsx from 'clsx'

import { formatCash } from '~/utils/formatter'
import noImage from '~/assets/no-image.png'
import { routesConfig } from '~/config'
import { Rating } from '~/components'
import Options from './Options'
import styles from './Product.module.css'
import {
  checkBestSellerProduct,
  checkFavoriteProduct,
  checkNewProduct,
  checkTrendingProduct
} from '~/utils/helpers'

const labels = {
  favorites: {
    icon: FaHeart,
    name: 'Favorite',
    color: '#fff',
    backgroundColor: '#ee3131',
    iconSize: '14px',
    textSize: '11px'
  },
  new: {
    icon: MdOutlineNewLabel,
    name: 'New',
    color: '#fff',
    backgroundColor: '#04d1d1',
    iconSize: '18px',
    textSize: '11px'
  },
  trending: {
    icon: FaArrowTrendUp,
    name: 'Trending',
    color: '#fff',
    backgroundColor: '#097ef6',
    iconSize: '16px',
    textSize: '11px'
  },
  bestSeller: {
    icon: FaStackOverflow,
    name: 'Best Seller',
    color: '#fff',
    backgroundColor: '#ee4d2d',
    iconSize: '16px',
    textSize: '11px'
  }
}

function Product({
  product,
  ratingStarSize = '13px',
  soldSize = '13px',
  className,
  horizontal,
  showLabel,
  autoLabel,
  labelName,
  labelIcon,
  labelColor = '#fff',
  labelBackgroundColor = '#ee3131'
}) {
  const [label, setLabel] = useState(null)

  useEffect(() => {
    if (autoLabel) {
      if (checkTrendingProduct(product)) {
        setLabel(labels.trending)
      } else if (checkFavoriteProduct(product)) {
        setLabel(labels.favorites)
      } else if (checkBestSellerProduct(product)) {
        setLabel(labels.bestSeller)
      } else if (checkNewProduct(product)) {
        setLabel(labels.new)
      }
    }
  }, [
    autoLabel,
    product,
    product.averageRatings,
    product.createdAt,
    product.sold
  ])

  let LabelIcon = labelIcon
  let renderedLabelName = labelName
  let renderedLabelColor = labelColor
  let renderedLabelBackgroundColor = labelBackgroundColor

  if (autoLabel) {
    LabelIcon = label?.icon
    renderedLabelName = label?.name
    renderedLabelColor = label?.color
    renderedLabelBackgroundColor = label?.backgroundColor
  }

  return (
    <div
      className={clsx(
        {
          'grid grid-cols-4 relative': horizontal
        },
        styles.card,
        className,
        'h-full mx-[10px] p-[15px] border relative'
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
        <div className='flex items-center gap-4'>
          <Rating
            size={ratingStarSize}
            averageRatings={product.averageRatings}
          />
          <span className={clsx(`text-[${soldSize}]`, 'relative top-[1.3px]')}>
            Sold {product.sold}
          </span>
        </div>
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
            <LabelIcon size='13px' color={renderedLabelColor} />
          ) : (
            ''
          )}
          <span
            style={{
              color: renderedLabelColor
            }}
            className='text-[10px] px-[6px]'
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
