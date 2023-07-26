export const create = ({ webSocket }) => {
  return webSocket
}

export const wrap = (webSocket) => {
  return {
    webSocket,
    /**
     * @type {any}
     */
    listener: undefined,
    send(message) {
      this.webSocket.send(JSON.stringify(message))
    },
    get onmessage() {
      return this.listener
    },
    set onmessage(listener) {
      const wrappedListener = (event) => {
        const message = JSON.parse(event.data)
        listener(message)
      }
      this.listener = listener
      this.webSocket.onmessage = wrappedListener
    },
  }
}
