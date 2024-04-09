import { Link } from 'react-router-dom'
import { FaHeart, FaEye } from 'react-icons/fa'
import { TiThMenu } from 'react-icons/ti'
import OptionItem from './OptionItem'
import { routesConfig } from '~/config'

function Options({ className, slug }) {
  return (
    <div className={`${className} flex gap-4`}>
      <OptionItem icon={<FaHeart size='14px' />} />
      <Link to={routesConfig.productDetails(slug)}>
        <OptionItem icon={<TiThMenu size='16px' />} />
      </Link>
      <OptionItem icon={<FaEye size='17px' />} />
    </div>
  )
}

export default Options
