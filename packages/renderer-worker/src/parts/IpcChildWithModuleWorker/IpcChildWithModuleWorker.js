export const create = () => {
  globalThis.postMessage('ready')
  return globalThis
}

export const wrap = (global) => {
  return {
    global,
    send(message) {
      this.global.postMessage(message)
    },
    get onmessage() {
      return this.handleMessage
    },
    set onmessage(listener) {
      this.handleMessage = (event) => {
        listener(event.data)
      }
      this.global.onmessage = this.handleMessage
    },
  }
}
