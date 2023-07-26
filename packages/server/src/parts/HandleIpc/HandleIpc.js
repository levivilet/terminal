import * as Callback from '../Callback/Callback.js'
import * as Command from '../Command/Command.js'
import * as GetResponse from '../GetResponse/GetResponse.js'

export const handleIpc = (ipc) => {
  const handleMessage = async (message) => {
    if ('method' in message) {
      const response = await GetResponse.getResponse(
        message,
        Command.execute,
        ipc,
      )
      if ('id' in message) {
        ipc.send(response)
      }
      return
    }
    if ('id' in message) {
      return Callback.resolve(message.id, message)
    }
    throw new Error(`unexpected message`)
  }
  ipc.onmessage = handleMessage
}
