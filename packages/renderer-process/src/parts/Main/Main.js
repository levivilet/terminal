import * as GetIpcType from '../GetIpcType/GetIpcType.js'
import * as GetWorkerUrl from '../GetWorkerUrl/GetWorkerUrl.js'
import * as HandleIpc from '../HandleIpc/HandleIpc.js'
import * as IpcParent from '../IpcParent/IpcParent.js'

export const main = async () => {
  const workerUrl = GetWorkerUrl.getWorkerUrl()
  const method = GetIpcType.getIpcType()
  const ipc = await IpcParent.create({
    url: workerUrl,
    method,
    name: 'Terminal Worker',
    type: 'module',
  })
  HandleIpc.handleIpc(ipc)
}
