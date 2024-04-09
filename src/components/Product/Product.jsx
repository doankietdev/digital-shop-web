import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { MdOutlineNewLabel } from 'react-icons/md'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { formatCash } from '~/utils/formatter'
import noImage from '~/assets/no-image.png'
import { routesConfig } from '~/config'
import { Rating } from '~/components'
import Options from './Options'
import './Product.css'

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

function Product({ product }) {
  const [label, setLabel] = useState(null)

  useEffect(() => {
    const createdDate = new Date(product.createdAt)
    const nowDate = new Date()
    const diffTime = Math.abs(nowDate - createdDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const NEW_DISTANCE_DAY = 10
    const TRENDING_SOLD = 20
    const FAVORITE_RATING = 4

    const isTrending =
      product.sold >= TRENDING_SOLD && product.averageRatings >= FAVORITE_RATING
    const isFavorite = product.averageRatings >= FAVORITE_RATING
    const isNew = diffDays <= NEW_DISTANCE_DAY

    if (isTrending) {
      setLabel(labels.trending)
    } else if (isFavorite) {
      setLabel(labels.favorites)
    } else if (isNew) {
      setLabel(labels.new)
    }
  }, [product.averageRatings, product.createdAt, product.sold])

  const LabelIcon = label?.icon

  return (
    <div className='product-slider-card mx-[10px] p-[15px] border h-[384px] relative'>
      <div className='relative'>
        <Link to={routesConfig.productDetails(product.slug)}>
          <img
            src={product.thumb || noImage}
            alt={product.title}
            className='w-full h-[244px] object-contain'
          />
        </Link>
        <Options
          slug={product.slug}
          className='product-slider-card-options absolute bottom-0 left-[50%] translate-x-[-50%]'
        />
      </div>
      <div className='mt-5'>
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
      {label ? (
        <div
          className='product-label'
          style={{
            color: label.backgroundColor
          }}
        >
          {LabelIcon ? (
            <LabelIcon size={label.iconSize} color={label.color} />
          ) : (
            ''
          )}
          <span
            style={{
              color: label.color
            }}
            className='text-xs px-[6px]'
          >
            {label.name}
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Product
