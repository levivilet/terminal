import * as Terminal from '../Terminal/Terminal.js'

export const getFn = (method) => {
  switch (method) {
    case 'Terminal.handleInput':
      return Terminal.handleInput
    case 'Terminal.handleData':
      return Terminal.handleData
    case 'Terminal.handleKeyDown':
      return Terminal.handleKeyDown
    default:
      throw new Error(`command not found`)
  }
}
