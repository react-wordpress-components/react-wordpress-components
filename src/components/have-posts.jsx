import React from 'react'
import PropTypes from 'prop-types'
import WPAPI from 'wpapi'

/**
 * Have posts
 * @extends React
 */
class HavePosts extends React.PureComponent {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  /**
   * defaultProps
   * @type {object}
   */
  static defaultProps = {
    version: 'v2',
    children: [],
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    const { endpoint } = props
    const wp = new WPAPI({ endpoint })
    this.state = { wp, posts: [], error: false, trying: false }
  }

  /**
   * componentWillMount
   * @return {void}
   */
  componentWillMount() {
    const { wp } = this.state
    this.setState({ ...this.state, trying: true })
    wp
      .posts()
      .then(posts => this.setState({ ...this.state, posts, trying: false }))
      .catch(() => this.setState({ ...this.state, error: true, trying: false }))
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(_0, nextState) {
    return this.state.trying !== nextState.trying
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { wp, posts, error, trying } = this.state

    return trying ? (
      <p>{'trying...'}</p>
    ) : error ? (
      <p>{'Network error.'}</p>
    ) : (
      posts.map(post => {
        const child = React.Children.only(this.props.children)
        if (child.type.templateTagName === 'the_post') {
          return React.cloneElement(child, { post, wp, key: post.id })
        } else {
          return child
        }
      })
    )
  }
}

export default HavePosts
