import { FaEye, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { routesConfig } from '~/config'
import { parsePlaceHolderUrl } from '~/utils/formatter'
import OptionItem from './OptionItem'
import { useCallback } from 'react'

// eslint-disable-next-line no-unused-vars
function Options({ className, slug, productId }) {
  const handleAddToWishlist = useCallback(() => {}, [])
  return (
    <div className={`${className} flex gap-4`}>
      <OptionItem
        icon={<FaHeart size="14px" />}
        title="Add to wishlist"
        onClick={handleAddToWishlist}
      />
      <Link
        to={parsePlaceHolderUrl(routesConfig.productDetails, {
          slug
        })}
      >
        <OptionItem icon={<FaEye size="17px" />} title="View details" />
      </Link>
    </div>
  )
}

export default Options
