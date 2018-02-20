# WReact

[![Build Status](https://travis-ci.org/wreact/wreact.svg?branch=master)](https://travis-ci.org/wreact/wreact)

## demos

https://wreact.github.io/wreact

## API

React based WordPress theme development library.
Wreact has similar API with Template Tags:

| WReact API      | Template Tags   |
| :-------------- | :-------------- |
| `<HavePosts />` | `have_posts();` |
| `<ThePost />`   | `the_post();`   |
| `<TheTitle />`  | `the_title();`  |
| ...             | ...             |

## usage

```shell
$ npm install react react-dom --save
$ npm install git@github.com:wreact/wreact.git --save
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import HavePosts from 'wreact/dist/have-posts'
import ThePost from 'wreact/dist/the-post'
import TheTitle from 'wreact/dist/the-title'
import TheContent from 'wreact/dist/the-content'

const App = () => {
  return (
    <div>
      <HavePosts
        endpoint={'https://exmple.com'}
        query={{ per_page: 5, sortby: 'title' }}
      >
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
    </div>
  )
}

render(<App />, document.getElementById('app'))
```

## development

```shell
$ git clone git@github.com:wreact/wreact.git
$ cd wreact
$ npm install
$ npm test
```

## run demos

```shell
$ git clone git@github.com:wreact/wreact.git
$ cd wreact
$ npm install
$ npm start
```

then open http://localhost:4000 with your browser.
