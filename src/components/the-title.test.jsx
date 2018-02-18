import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheTitle from './the-title'

describe('`<TheTitle />`', () => {
  it('should render title', () => {
    const props = {
      post: {
        title: {
          rendered: 'My <strong>Title</strong>',
        },
      },
    }
    const wrapper = shallow(<TheTitle { ...props } />)
    expect(wrapper.html()).to.contain('My <strong>Title</strong>')
  })
})
