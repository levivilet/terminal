import * as Terminals from '../Terminals/Terminals.js'

export const handleInput = (data) => {
  const terminal = Terminals.get(0)
  terminal.handleData(data)
}
