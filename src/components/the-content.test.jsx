import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheContent from './the-content'

describe('test of `<TheContent />` component', () => {
  it('should render content', () => {
    const post = {
      content: {
        rendered: '<p>My Content</p>',
      },
    }
    const wrapper = shallow(<TheContent post={ post } />)
    expect(wrapper.html()).to.contain('<p>My Content</p>')
  })
})
