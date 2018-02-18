import React from 'react'
import HavePosts from './components/have-posts'
import ThePost from './components/the-post'
import TheTitle from './components/the-title'
import TheID from './components/the-id'
import TheContent from './components/the-content'
import styled from 'styled-components'

const QueryEditor = styled.textarea`
  width: 500px;
  height: 250px;
  font-size: 1em;
`

export class SampleApp extends React.PureComponent {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      editingText: false,
      query: {
        per_page: 5,
        orderby: 'title',
      },
    }
    this.onQueryInputBlur = this.onQueryInputBlur.bind(this)
    this.onQueryInputFocus = this.onQueryInputFocus.bind(this)
    this.onQueryInputChange = this.onQueryInputChange.bind(this)
  }

  onQueryInputFocus = () => {
    this.setState({
      ...this.state,
      editingText: JSON.stringify(this.state.query, null, 2),
    })
  }

  onQueryInputChange = e => {
    this.setState({
      ...this.state,
      editingText: e.target.value,
    })
  }

  onQueryInputBlur = e => {
    try {
      this.setState({
        ...this.state,
        query: JSON.parse(e.target.value),
        editingText: false,
      })
    } catch (e) {
      this.setState({
        ...this.state,
        editingText: false,
      })
    }
  }

  render() {
    const { query, editingText } = this.state

    return (
      <div>
        <QueryEditor
          value={
            editingText === false ? JSON.stringify(query, null, 2) : editingText
          }
          onFocus={ this.onQueryInputFocus }
          onChange={ this.onQueryInputChange }
          onBlur={ this.onQueryInputBlur }
        />

        <HavePosts endpoint={ 'https://api.wp-app.org' } query={ query }>
          <ThePost>
            <header>
              <h1>
                <TheTitle />
              </h1>
              <p style={ { fontStyle: 'Italic' } }>
                {'Post No.'}
                <TheID />
              </p>
            </header>
            <main>
              <TheContent />
            </main>
          </ThePost>
        </HavePosts>
      </div>
    )
  }
}

/**
 * export
 */
export default SampleApp
