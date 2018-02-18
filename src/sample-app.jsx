import React from 'react'
import HavePosts from './components/have-posts'
import ThePost from './components/the-post'
import TheTitle from './components/the-title'
import TheContent from './components/the-content'

const SampleApp = () => {
  return (
    <HavePosts endpoint={ 'https://api.wp-app.org' } query={ {} }>
      <ThePost>
        <header>
          <h1>
            <TheTitle />
          </h1>
        </header>
        <main>
          <TheContent />
        </main>
      </ThePost>
    </HavePosts>
  )
}

/**
 * export
 */
export default SampleApp
