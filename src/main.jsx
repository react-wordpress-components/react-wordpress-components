import React from 'react'
import { render } from 'react-dom'

// component
import SampleApp from './sample-app'
import { AppContainer } from 'react-hot-loader'

/**
 * rendering mount point
 * @type {DOMElement}
 */
const MOUNT_NODE = document.getElementById('app')

// Go!
render(<SampleApp />, MOUNT_NODE)

// Hot Module Replacement settings
if (module.hot) {
  module.hot.accept('./sample-app', () => {
    const NextApp = require('./sample-app').default
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      MOUNT_NODE,
    )
  })
}
