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
    postType: PropTypes.string,
    version: PropTypes.string,
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
    postType: 'post',
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
    this.state = { posts: [], type: '' }
  }

  /**
   * componentWillMount
   * @return {void}
   */
  componentWillMount() {
    const { endpoint, version, postType } = this.props
    const url = `${endpoint}/wp-json/wp/${version}/${this.toPlural(postType)}`
    fetch(url)
      .then(res => res.json())
      .then(posts => this.setState({ posts, type: postType }))
  }

  /**
   * convert singular post type string to plural form
   * @param  {string} postType given postType
   * @return {string}          postType in plural form
   */
  toPlural = postType => `${postType}s`

  render() {
    const { posts, type } = this.state
    return posts.map(post => {
      const child = React.Children.only(this.props.children)

      if (child.type.templateTagName === 'the_post' && type === 'post') {
        return React.cloneElement(child, {
          data: { type, value: post },
          key: post.id,
        })
      } else {
        return child
      }
    })
  }
}

export default HavePosts
