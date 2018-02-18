import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheTitle from './the-title'

describe('test of `<TheTitle />` component', () => {
  it('should render title', () => {
    const post = {
      title: {
        rendered: 'My Title',
      },
    }
    const wrapper = shallow(<TheTitle post={ post } />)
    expect(wrapper.text()).to.equal('My Title')
  })
})
