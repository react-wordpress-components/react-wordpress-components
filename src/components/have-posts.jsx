import React from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import wait from 'src/lib/wait'

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
    version: PropTypes.string,
    query: PropTypes.object,
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
    query: {},
  }

  static buildUrl = (endpoint, version, query) => {
    const qs = Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&')
    return `${endpoint}/wp-json/wp/${version}/posts${qs ? '?' + qs : ''}`
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = { posts: [], error: false, trying: false }
    this.onRetryClick = this.onRetryClick.bind(this)
  }

  /**
   * componentWillMount
   * @return {void}
   */
  componentWillMount() {
    const { endpoint, version, query } = this.props
    const url = HavePosts.buildUrl(endpoint, version, query)

    this.setState({ ...this.state, error: false, trying: true })
    // TODO: catch should wait `wait(100)`
    Promise.all([fetch(url), wait(100)])
      .then(results => results[0].json())
      .then(posts => this.setState({ posts, error: false, trying: false }))
      .catch(error => this.setState({ ...this.state, error, trying: false }))
  }

  /**
   * componentWillReceiveProps
   * @param  {object} nextProps React props.
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props.query, nextProps.query)) {
      const { endpoint, version, query } = nextProps
      const url = HavePosts.buildUrl(endpoint, version, query)

      this.setState({ ...this.state, error: false, trying: true })
      // TODO: catch should wait `wait(100)`
      Promise.all([fetch(url), wait(100)])
        .then(results => results[0].json())
        .then(
          posts =>
            console.log(posts[0]) ||
            this.setState({ posts, error: false, trying: false }),
        )
        .catch(error => this.setState({ ...this.state, error, trying: false }))
    }
  }

  /**
   * handle on retry click
   * @type {function}
   */
  onRetryClick = this.componentWillMount

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { posts, error, trying } = this.state
    return trying ? (
      <p>{'trying...'}</p>
    ) : error ? (
      <p>
        {'Network error.'}
        <button onClick={ this.onRetryClick }>{'retry'}</button>
      </p>
    ) : (
      posts.map(post => {
        const child = React.Children.only(this.props.children)

        if (child.type.templateTagName === 'the_post') {
          return React.cloneElement(child, { post, key: post.id })
        } else {
          return child
        }
      })
    )
  }
}

export default HavePosts
