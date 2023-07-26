import * as Terminal from '../Terminal/Terminal.js'

export const getFn = (method) => {
  switch (method) {
    case 'Terminal.create':
      return Terminal.create
    case 'Terminal.handleInput':
      return Terminal.handleInput
    default:
      throw new Error(`command not found`)
  }
}
