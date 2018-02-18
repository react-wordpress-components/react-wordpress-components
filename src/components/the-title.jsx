import PropTypes from 'prop-types'

export const TheTitle = props => {
  const { post: { title: { rendered: renderedTitle = '' } = {} } } = props
  return renderedTitle
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
