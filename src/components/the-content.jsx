import React from 'react'
import PropTypes from 'prop-types'

const TheContent = props => {
  const {
    data: { value: { content: { rendered: renderedContent = '' } = {} } = {} },
  } = props

  const innerHTML = { __html: renderedContent }
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={ innerHTML } />
}

TheContent.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.shape({
      content: PropTypes.shape({
        rendered: PropTypes.string,
      }),
    }),
  }),
}

TheContent.defaultProps = {
  data: {},
}

export default TheContent
