import * as HandleIpc from '../HandleIpc/HandleIpc.js'
import * as IpcChild from '../IpcChild/IpcChild.js'
import * as IpcChildType from '../IpcChildType/IpcChildType.js'

/**
 *
 * @param {import('ws').WebSocket} ws
 */
export const handleWebSocket = async (ws) => {
  const ipc = await IpcChild.listen({
    method: IpcChildType.WebSocket,
    webSocket: ws,
  })
  HandleIpc.handleIpc(ipc)
}
