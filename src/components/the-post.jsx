import React from 'react'
import deepEqual from 'deep-equal'
import PropTypes from 'prop-types'

class ThePost extends React.Component {
  static templateTagName = 'the_post'

  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    post: PropTypes.object.isRequired,
    wp: PropTypes.object.isRequired,
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

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props.post, nextProps.post)
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
    const { post, wp } = this.props
    const fixedProps = { post, wp }
    const Post = () => this.mapPropsToAllChildren(fixedProps)
    return (
      <div id={ `post-id-${post.id}` }>
        <Post />
      </div>
    )
  }
}

export default ThePost
