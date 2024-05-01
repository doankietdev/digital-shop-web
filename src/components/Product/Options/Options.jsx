import { Link } from 'react-router-dom'
import { FaHeart, FaEye } from 'react-icons/fa'
import OptionItem from './OptionItem'
import { routesConfig } from '~/config'
import { parsePlaceHolderUrl } from '~/utils/formatter'
import { FaCartPlusIcon } from '~/utils/icons'

function Options({ className, slug }) {
  return (
    <div className={`${className} flex gap-4`}>
      <OptionItem icon={<FaHeart size='14px' />} title='Add to wishlist' />
      <OptionItem icon={<FaCartPlusIcon size='16px' />} title='Add to cart' />
      <Link
        to={parsePlaceHolderUrl(routesConfig.productDetails, {
          slug
        })}
      >
        <OptionItem icon={<FaEye size='17px' />} title='View details' />
      </Link>
    </div>
  )
}

export default Options
