import React from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'

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
    this.state = { posts: [] }
  }

  /**
   * componentWillMount
   * @return {void}
   */
  componentWillMount() {
    const { endpoint, version, query } = this.props
    const url = HavePosts.buildUrl(endpoint, version, query)
    fetch(url)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
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
      fetch(url)
        .then(res => res.json())
        .then(posts => this.setState({ posts }))
    }
  }

  render() {
    const { posts } = this.state
    return posts.map(post => {
      const child = React.Children.only(this.props.children)

      if (child.type.templateTagName === 'the_post') {
        return React.cloneElement(child, {
          data: { value: post },
          key: post.id,
        })
      } else {
        return child
      }
    })
  }
}

export default HavePosts
