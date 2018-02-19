global.setMockfetchReturns = resultJSON => {
  global.trueFetch = global.fetch
  global.fetch = () => {
    return {
      then: () => {
        return {
          then: callback => ({ catch: callback(resultJSON) }),
          catch: callback => callback(resultJSON),
        }
      },
      catch: callback => callback(resultJSON),
    }
  }
}
