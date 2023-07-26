import * as GetWsUrl from '../GetWsUrl/GetWsUrl.js'
import * as HandleIpc from '../HandleIpc/HandleIpc.js'
import * as IpcParent from '../IpcParent/IpcParent.js'
import * as IpcParentType from '../IpcParentType/IpcParentType.js'
import * as JsonRpc from '../JsonRpc/JsonRpc.js'

export const state = {
  /**
   * @type {any}
   */
  ipc: undefined,
}

// TODO when running in browser, could emulate node connection throught webworker ipc
const listenFallback = () => {
  const ipc = {
    /**
     * @type {any}
     */
    listener: undefined,
    send(message) {
      if ('id' in message) {
        this.listener({
          jsonrpc: '2.0',
          id: message.id,
          result: null,
        })
      }
    },
    set onmessage(listener) {
      this.listener = listener
    },
  }
  state.ipc = ipc
  HandleIpc.handleIpc(ipc)
  return ipc
}

export const listen = async () => {
  try {
    const wsUrl = GetWsUrl.getWsUrl()
    const ipc = await IpcParent.create({
      method: IpcParentType.WebSocket,
      wsUrl,
    })
    HandleIpc.handleIpc(ipc)
    state.ipc = ipc
    return ipc
  } catch {
    return listenFallback()
  }
}

export const invoke = (method, ...params) => {
  return JsonRpc.invoke(state.ipc, method, ...params)
}
