import { spawn } from 'node-pty'
import VError from 'verror'
import * as os from 'os'

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

export const create = (id, ipc) => {
  try {
    const terminal = spawn(shell, [], {})
    terminal.onData((data) => {
      ipc.send({
        jsonrpc: '2.0',
        method: 'Terminal.handleData',
        params: [id, data],
      })
    })
  } catch (error) {
    // @ts-ignore
    throw new VError(error, `Failed to launch terminal`)
  }
}
