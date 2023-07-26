import * as Terminal from '../Terminal/Terminal.js'

export const getFn = (method) => {
  switch (method) {
    case 'Terminal.handleInput':
      return Terminal.handleInput
    case 'Terminal.handleData':
      return Terminal.handleData
    default:
      throw new Error(`command not found`)
  }
}
