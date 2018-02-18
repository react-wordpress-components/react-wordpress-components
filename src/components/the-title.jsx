import React from 'react'
import PropTypes from 'prop-types'

export const TheTitle = props => {
  const { post: { title: { rendered: renderedTitle = '' } = {} } } = props
  const innerHTML = { __html: renderedTitle }
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={ innerHTML } />
}

TheTitle.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.shape({
      rendered: PropTypes.string,
    }),
  }),
}

TheTitle.defaultProps = {
  post: {},
}

export default TheTitle
