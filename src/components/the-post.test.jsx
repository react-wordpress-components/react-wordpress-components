import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ThePost from './the-post'

describe('`<ThePost />`', () => {
  it('should render post id', () => {
    const props = {
      post: {
        id: 123,
        title: {
          rendered: 'My <strong>Title</strong>',
        },
      },
    }
    const wrapper = shallow(<ThePost { ...props } />)
    expect(wrapper.find('#post-id-123')).to.have.length(1)
  })
})
