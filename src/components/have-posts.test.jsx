import React from 'react'
import { expect } from 'chai'
import { render } from 'enzyme'
import HavePosts from './have-posts'

describe('test of `<HavePosts />` component', () => {
  it('should render child', () => {
    const props = {
      endpoint: 'http://example.com',
      version: 'v2',
    }
    const DummyChild = () => <div className={ '__test_class_name' } />

    global.setMockfetchReturns([
      { id: 1, title: 'title1' },
      { id: 2, title: 'title2' },
    ])

    const wrapper = render(
      <HavePosts { ...props }>
        <DummyChild />
      </HavePosts>,
    )
    expect(wrapper._root[0].attribs.class).to.equal('__test_class_name')
    expect(wrapper._root[1].attribs.class).to.equal('__test_class_name')
  })
})
