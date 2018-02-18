global.setMockfetchReturns = resultJSON => {
  global.trueFetch = global.fetch
  global.fetch = () => {
    return {
      then: () => {
        return {
          then: callback => callback(resultJSON),
        }
      },
    }
  }
}
