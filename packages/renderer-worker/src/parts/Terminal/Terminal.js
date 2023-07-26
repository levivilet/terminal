import * as Terminals from '../Terminals/Terminals.js'

export const handleInput = (data) => {
  const terminal = Terminals.get(0)
  terminal.handleData(data)
}

export const handleData = (id, data) => {
  const terminal = Terminals.get(id)
  terminal.handleData(data)
}
