import * as IpcChildType from '../IpcChildType/IpcChildType.js'

export const get = (method) => {
  switch (method) {
    case IpcChildType.WebSocket:
      return import('../IpcChildWithWebSocket/IpcChildWithWebSocket.js')
    default:
      throw new Error('module not found')
  }
}
