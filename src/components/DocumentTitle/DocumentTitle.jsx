import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

function DocumentTitle({ title = '' }) {
  const myBrandName = 'Digital World Shop'
  return (
    <Helmet>
      <title>{title ? `${title + ' | ' + myBrandName}` : myBrandName}</title>
    </Helmet>
  )
}

DocumentTitle.propTypes = {
  title: PropTypes.string
}

export default DocumentTitle
