import PropTypes from 'prop-types'

export const TheAuthor = props => {
  const { post: { author } = {} } = props
  return author || ''
}

TheAuthor.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
  }),
}

TheAuthor.defaultProps = {
  post: {},
}

export default TheAuthor
