import { expect } from 'chai'
import wait from './wait'

describe('asynchronous wait', () => {
  it('should wait', done => {
    const startAt = Date.now()
    wait(200).then(() => {
      const finishAt = Date.now()
      const diff = finishAt - startAt
      expect(diff).to.be.above(150)
      expect(diff).to.be.below(250)
      done()
    })
  })
})
