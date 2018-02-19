import React from 'react'
import PropTypes from 'prop-types'

const TheExcerpt = props => {
  const { post: { excerpt: { rendered: renderedExcerpt = '' } = {} } } = props
  const innerHTML = { __html: renderedExcerpt }
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={ innerHTML } />
}

TheExcerpt.propTypes = {
  post: PropTypes.shape({
    excerpt: PropTypes.shape({
      rendered: PropTypes.string,
    }),
  }),
}

TheExcerpt.defaultProps = {
  post: {},
}

export default TheExcerpt
