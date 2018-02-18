import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheContent from './the-content'

describe('test of `<TheContent />` component', () => {
  it('should render content', () => {
    const data = {
      type: 'post',
      value: {
        content: {
          rendered: '<p>My Content</p>',
        },
      },
    }
    const wrapper = shallow(<TheContent data={ data } />)
    expect(wrapper.html()).to.contain('<p>My Content</p>')
  })
})
