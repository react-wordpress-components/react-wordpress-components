import React from 'react'
import PropTypes from 'prop-types'

const TheContent = props => {
  const { post: { content: { rendered: renderedContent = '' } = {} } } = props

  const innerHTML = { __html: renderedContent }
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={ innerHTML } />
}

TheContent.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.shape({
      rendered: PropTypes.string,
    }),
  }),
}

TheContent.defaultProps = {
  post: {},
}

export default TheContent
