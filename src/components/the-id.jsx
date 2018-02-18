import PropTypes from 'prop-types'

export const TheTitle = props => {
  const { post: { id } = {} } = props
  return id || ''
}

TheTitle.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
  }),
}

TheTitle.defaultProps = {
  post: {},
}

export default TheTitle
