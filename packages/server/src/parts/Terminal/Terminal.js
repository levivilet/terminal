import { VError } from '@lvce-editor/verror'
import { spawn } from 'node-pty'
import * as os from 'os'
import * as TerminalState from '../TerminalState/TeminalState.js'

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

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
    TerminalState.set(id, terminal)
  } catch (error) {
    throw new VError(error, `Failed to launch terminal`)
  }
}

export const handleInput = (id, data) => {
  const terminal = TerminalState.get(id)
  if (!terminal) {
    throw new Error(`terminal not found ${id}`)
  }
  terminal.write(data)
}

// TODO dispose terminals explicitly or when ipc connection closes
