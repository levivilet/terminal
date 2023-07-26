import * as Callback from '../Callback/Callback.js'
import * as Command from '../Command/Command.js'

export const handleIpc = (ipc) => {
  const handleMessage = async (message) => {
    if ('method' in message) {
      await Command.execute(message.method, ...message.params)
      return
    }
    if ('id' in message) {
      return Callback.resolve(message.id, message)
    }
    throw new Error(`unexpected message`)
  }
  ipc.onmessage = handleMessage
}
