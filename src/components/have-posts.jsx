import React from 'react'
import PropTypes from 'prop-types'

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
    const url = this.buildUrl()
    fetch(url)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
  }

  buildUrl = () => {
    const { endpoint, version, query } = this.props
    const qs = Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&')
    return `${endpoint}/wp-json/wp/${version}/posts${qs ? '?' + qs : ''}`
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
