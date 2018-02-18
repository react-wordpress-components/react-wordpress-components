import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheTitle from './the-title'

describe('test of `<TheTitle />` component', () => {
  it('should render title', () => {
    const data = {
      type: 'post',
      value: {
        title: {
          rendered: 'My Title',
        },
      },
    }
    const wrapper = shallow(<TheTitle data={ data } />)
    expect(wrapper.text()).to.equal('My Title')
  })
})
