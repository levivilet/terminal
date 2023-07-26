import * as FirstWebSocketEventType from '../FirstWebSocketEventType/FirstWebSocketEventType.js'
import { IpcError } from '../IpcError/IpcError.js'
import * as WaitForWebSocketToBeOpen from '../WaitForWebSocketToBeOpen/WaitForWebSocketToBeOpen.js'

export const create = async ({ wsUrl }) => {
  const webSocket = new WebSocket(wsUrl)
  const { type, event } =
    await WaitForWebSocketToBeOpen.waitForWebSocketToBeOpen(webSocket)
  if (type === FirstWebSocketEventType.Close) {
    throw new IpcError(`Websocket connection was immediately closed`)
  }
  return webSocket
}

export const wrap = (webSocket) => {
  return {
    webSocket,
    /**
     * @type {any}
     */
    handleMessage: undefined,
    send(message) {
      this.webSocket.send(JSON.stringify(message))
    },
    get onmessage() {
      return this.handleMessage
    },
    set onmessage(listener) {
      this.handleMessage = (event) => {
        listener(JSON.parse(event.data))
      }
      this.webSocket.onmessage = this.handleMessage
    },
  }
}
