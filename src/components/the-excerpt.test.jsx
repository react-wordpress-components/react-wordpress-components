import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheExcerpt from './the-excerpt'

describe('`<TheExcerpt />`', () => {
  it('should render excerpt', () => {
    const post = {
      excerpt: {
        rendered: '<p>My excerpt</p>',
      },
    }
    const wrapper = shallow(<TheExcerpt post={ post } />)
    expect(wrapper.html()).to.contain('<p>My excerpt</p>')
  })
})
