import { IpcError } from '../IpcError/IpcError.js'
import * as IsMessagePort from '../IsMessagePort/IsMessagePort.js'

export const create = async ({ url }) => {
  const portPromise = new Promise((resolve) => {
    globalThis.acceptPort = resolve
  })
  await import(url)
  const port = await portPromise
  delete globalThis.acceptPort
  if (!port) {
    throw new IpcError('port must be defined')
  }
  if (!IsMessagePort.isMessagePort(port)) {
    throw new IpcError('port must be of type MessagePort')
  }
  return port
}

export const wrap = (port) => {
  return {
    port,
    handleMessage: undefined,
    send(message) {
      this.port.postMessage(message)
    },
    sendAndTransfer(message, transfer) {
      this.port.postMessage(message, transfer)
    },
    get onmessage() {
      return this.handleMessage
    },
    set onmessage(listener) {
      // @ts-ignore
      this.handleMessage = (event) => {
        // @ts-ignore
        listener(event.data)
      }
      this.port.onmessage = this.handleMessage
    },
  }
}
