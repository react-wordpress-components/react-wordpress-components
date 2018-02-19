import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TheAuthor from './the-author'

describe('`<TheAuthor />`', () => {
  it('should render author', () => {
    const post = { author: 1 }
    const wrapper = shallow(<TheAuthor post={ post } />)
    expect(wrapper.text()).to.equal('the author')
  })
})
