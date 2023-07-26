import * as IpcParentType from '../IpcParentType/IpcParentType.js'

export const get = (method) => {
  switch (method) {
    case IpcParentType.WebSocket:
      return import('../IpcParentWithWebSocket/IpcParentWithWebSocket.js')
    default:
      throw new Error(`unexpected ipc type`)
  }
}
