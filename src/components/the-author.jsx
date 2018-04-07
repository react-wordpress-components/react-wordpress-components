import React from 'react'
import PropTypes from 'prop-types'

export class TheAuthor extends React.PureComponent {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    wp: PropTypes.object.isRequired,
    post: PropTypes.shape({
      author: PropTypes.number,
    }),
  }

  /**
   * defaultProps
   * @type {object}
   */
  static defaultProps = {
    post: {},
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = { name: '', error: false, requesting: false }
  }

  /**
   * componentWillMount
   * @return {void}
   */
  componentWillMount() {
    console.log('author mounting')
    const { wp, post } = this.props
    this.setState({ ...this.state, trying: true })
    wp
      .users()
      .id(post.author)
      .then(({ name }) => this.setState({ ...this.state, name, trying: false }))
      .catch(() => this.setState({ ...this.state, error: true, trying: false }))
  }

  /**
   * componentWillUnmount
   * @return {void}
   */
  componentWillUnmount() {
    console.log('author unmounitng!')
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { name } = this.state
    return name || ''
  }
}

export default TheAuthor
