import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

function DocumentTitle({ title = '' }) {
  return (
    <Helmet>
      <title>{title} | Digital World Shop</title>
    </Helmet>
  )
}

DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default DocumentTitle
