import { spawn } from 'node-pty'
import { VError } from '@lvce-editor/verror'
import * as os from 'os'

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

export const state = {
  terminals: Object.create(null),
}

export const create = (id, ipc) => {
  try {
    const terminal = spawn(shell, [], {
      rows: 20,
      cols: 40,
    })
    terminal.onData((data) => {
      ipc.send({
        jsonrpc: '2.0',
        method: 'Terminal.handleData',
        params: [id, data],
      })
    })
    state.terminals[id] = terminal
  } catch (error) {
    throw new VError(error, `Failed to launch terminal`)
  }
}

export const handleInput = (id, data) => {
  const terminal = state.terminals[id]
  if (!terminal) {
    throw new Error(`terminal not found ${id}`)
  }
  terminal.write(data)
}

// TODO dispose terminals explicitly or when ipc connection closes
