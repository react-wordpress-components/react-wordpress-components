import React from 'react'
import HavePosts from './components/have-posts'
import ThePost from './components/the-post'
import TheAuthor from './components/the-author'
import TheTitle from './components/the-title'
import TheExcerpt from './components/the-excerpt'

export const SampleApp = () => {
  return (
    <div>
      <HavePosts endpoint={ 'https://api.wp-app.org/wp-json' }>
        <ThePost>
          <header>
            <h1>
              <TheTitle />
            </h1>
            <p>
              {'Author: '}
              <TheAuthor />
            </p>
          </header>
          <main>
            <TheExcerpt />
          </main>
        </ThePost>
      </HavePosts>
    </div>
  )
}

export default SampleApp
