import PropTypes from 'prop-types'

export const TheTitle = props => {
  const {
    data: { value: { title: { rendered: renderedTitle = '' } = {} } = {} },
  } = props
  return renderedTitle
}

TheTitle.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.shape({
      title: PropTypes.shape({
        rendered: PropTypes.string,
      }),
    }),
  }),
}

TheTitle.defaultProps = {
  data: {},
}

export default TheTitle
