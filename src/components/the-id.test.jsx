import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheID from './the-id'

describe('test of `<TheID />` component', () => {
  it('should render id', () => {
    const post = { id: 123 }
    const wrapper = shallow(<TheID post={ post } />)
    expect(wrapper.text()).to.equal('123')
  })
})
