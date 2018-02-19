import React from 'react'
import PropTypes from 'prop-types'

class ThePost extends React.PureComponent {
  static templateTagName = 'the_post'

  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    post: PropTypes.object.isRequired,
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
    post: {},
    children: [],
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
  }

  mapPropsToAllChildren = (fixedProps, children = this.props.children) =>
    React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child
      } else if (child.props.children) {
        const descendantProps = { ...fixedProps }
        return React.cloneElement(
          child,
          descendantProps,
          this.mapPropsToAllChildren(fixedProps, child.props.children),
        )
      } else {
        const descendantProps = { ...fixedProps }
        return React.cloneElement(child, descendantProps)
      }
    })

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { post } = this.props
    const fixedProps = { post }
    const Post = () => this.mapPropsToAllChildren(fixedProps)
    return (
      <div id={ `post-id-${post.id}` }>
        <Post />
      </div>
    )
  }
}

export default ThePost
